const prisma = require("../utils/prisma");

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required.",
      });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,

        members: {
          create: {
            userId: req.user.id,
            role: "ADMIN",
          },
        },
      },

      include: {
        members: true,
      },
    });

    return res.status(201).json({
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create project.",
      error: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },

      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return res.json(projects);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch projects.",
      error: error.message,
    });
  }
};
const addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Member email is required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const existingMember = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: user.id,
      },
    });

    if (existingMember) {
      return res.status(409).json({
        message: "User is already a project member.",
      });
    }

    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId: user.id,
        role: "MEMBER",
      },
    });

    return res.status(201).json({
      message: "Member added successfully.",
      member,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add member.",
      error: error.message,
    });
  }
};
const removeMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;

    const member = await prisma.projectMember.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member || member.projectId !== projectId) {
      return res.status(404).json({
        message: "Member not found in this project.",
      });
    }

    if (member.userId === req.user.id) {
      return res.status(400).json({
        message: "Admin cannot remove themselves from the project.",
      });
    }

    await prisma.projectMember.delete({
      where: {
        id: memberId,
      },
    });

    return res.json({
      message: "Member removed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove member.",
      error: error.message,
    });
  }
};
module.exports = {
  createProject,
  getProjects,
  addMember,
  removeMember,
};