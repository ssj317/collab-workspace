const pool = require("../config/postgres");

module.exports = (allowedRoles = []) => {
  return async (req, res, next) => {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    const result = await pool.query(
      `SELECT role FROM project_members
       WHERE project_id = $1 AND user_id = $2`,
      [projectId, userId]
    );

    if (!result.rows.length) {
      return res.status(403).json({ message: "No access to this project" });
    }

    const { role } = result.rows[0];

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Insufficient role" });
    }

    req.projectRole = role;
    next();
  };
};
