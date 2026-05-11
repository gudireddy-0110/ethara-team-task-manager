const prisma = require("../utils/prisma");

const getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await prisma.task.count();

    const todoTasks = await prisma.task.count({
      where: {
        status: "TODO",
      },
    });

    const inProgressTasks = await prisma.task.count({
      where: {
        status: "IN_PROGRESS",
      },
    });

    const doneTasks = await prisma.task.count({
      where: {
        status: "DONE",
      },
    });

    const overdueTasks = await prisma.task.count({
      where: {
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: "DONE",
        },
      },
    });

    const tasksPerUser = await prisma.task.groupBy({
      by: ["assignedToId"],
      _count: {
        assignedToId: true,
      },
    });

    return res.json({
      totalTasks,
      tasksByStatus: {
        TODO: todoTasks,
        IN_PROGRESS: inProgressTasks,
        DONE: doneTasks,
      },
      overdueTasks,
      tasksPerUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch dashboard statistics.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};