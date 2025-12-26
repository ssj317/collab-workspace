const service = require("./projects.service");

exports.createProject = async (req, res) => {
  const project = await service.createProject({
    ...req.body,
    ownerId: req.user.userId,
  });
  res.status(201).json(project);
};

exports.inviteMember = async (req, res) => {
  const { userId, role } = req.body;
  await service.addMember({
    projectId: req.params.projectId,
    userId,
    role,
  });
  res.json({ message: "Member added" });
};

exports.listProjects = async (req, res) => {
  const projects = await service.listUserProjects(req.user.userId);
  res.json(projects);
};
