const prisma = require("../utils/prisma");

const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      title,
      description,
      dueDate,
      priority,
      assignedToId,
    } = req.body;

    if (!title || !dueDate || !assignedToId) {
      return res.status(400).json({
        message: "Title, due date, and assigned user are required.",
      });
    }

    const member = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: assignedToId,
      },
    });

    if (!member) {
      return res.status(400).json({
        message: "Assigned user is not part of this project.",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        assignedToId,
        createdById: req.user.id,
        projectId,
      },

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task.",
      error: error.message,
    });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch tasks.",
      error: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const membership = await prisma.projectMember.findFirst({
  where: {
    projectId: task.projectId,
    userId: req.user.id,
  },
});

if (!membership) {
  return res.status(403).json({
    message: "You are not a member of this project.",
  });
}

if (membership.role !== "ADMIN" && task.assignedToId !== req.user.id) {
  return res.status(403).json({
    message: "Only admins or assigned members can update this task.",
  });
}

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        status,
      },
    });

    return res.json({
      message: "Task status updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update task.",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getProjectTasks,
  updateTaskStatus,
};