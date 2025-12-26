const pool = require("../../config/postgres");
const redis = require("../../config/redis");


async function createProject({ name, description, ownerId }) {
  const projectResult = await pool.query(
    `INSERT INTO projects (name, description, owner_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description, ownerId]
  );

  const project = projectResult.rows[0];

  await pool.query(
    `INSERT INTO project_members (project_id, user_id, role)
     VALUES ($1, $2, 'OWNER')`,
    [project.id, ownerId]
  );

  return project;
}

async function addMember({ projectId, userId, role }) {
  await pool.query(
    `INSERT INTO project_members (project_id, user_id, role)
     VALUES ($1, $2, $3)
     ON CONFLICT (project_id, user_id)
     DO UPDATE SET role = $3`,
    [projectId, userId, role]
  );
}

async function listUserProjects(userId) {
  const cacheKey = `user_projects:${userId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const result = await pool.query(
    `SELECT p.id, p.name, p.description, pm.role
     FROM projects p
     JOIN project_members pm ON p.id = pm.project_id
     WHERE pm.user_id = $1`,
    [userId]
  );

  await redis.setex(cacheKey, 60, JSON.stringify(result.rows));
  return result.rows;
}

module.exports = { createProject, addMember, listUserProjects };
