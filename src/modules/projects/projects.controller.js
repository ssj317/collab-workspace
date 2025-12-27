const service = require("./projects.service");
const { logEvent } = require("../../logs/logger");

exports.createProject = async (req, res) => {
  try {
    const project = await service.createProject({
      ...req.body,
      ownerId: req.user.userId,
    });

    //  Project creation log
    await logEvent({
      source: "project",
      message: "Project created",
      userId: req.user.userId,
      metadata: {
        projectId: project.id,
        name: project.name,
      },
    });

    res.status(201).json(project);
  } catch (err) {
    // Project creation failed log
    await logEvent({
      level: "ERROR",
      source: "project",
      message: "Project creation failed",
      userId: req.user.userId,
      metadata: {
        error: err.message,
        payload: req.body,
      },
    });

    res.status(400).json({ message: err.message });
  }
};

exports.inviteMember = async (req, res) => {
  const { userId, role } = req.body;
  const { projectId } = req.params;

  try {
    await service.addMember({
      projectId,
      userId,
      role,
    });

    //  Member invite log
    await logEvent({
      source: "project",
      message: "Project member invited",
      userId: req.user.userId,
      metadata: {
        projectId,
        invitedUserId: userId,
        role,
      },
    });

    res.json({ message: "Member added" });
  } catch (err) {
    // Invite failed log
    await logEvent({
      level: "ERROR",
      source: "project",
      message: "Project member invite failed",
      userId: req.user.userId,
      metadata: {
        projectId,
        invitedUserId: userId,
        role,
        error: err.message,
      },
    });

    res.status(400).json({ message: err.message });
  }
};

exports.listProjects = async (req, res) => {
  try {
    const projects = await service.listUserProjects(req.user.userId);

    //  Project list fetch log (lightweight)
    await logEvent({
      source: "project",
      message: "User projects fetched",
      userId: req.user.userId,
      metadata: {
        count: projects.length,
      },
    });

    res.json(projects);
  } catch (err) {
    //  List projects failed log
    await logEvent({
      level: "ERROR",
      source: "project",
      message: "Failed to fetch user projects",
      userId: req.user.userId,
      metadata: {
        error: err.message,
      },
    });

    res.status(500).json({ message: "Failed to fetch projects" });
  }
};
