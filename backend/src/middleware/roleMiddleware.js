const prisma = require("../utils/prisma");

const adminOnly = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: req.user.id,
      },
    });

    if (!membership) {
      return res.status(403).json({
        message: "You are not a member of this project.",
      });
    }

    if (membership.role !== "ADMIN") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authorization failed.",
      error: error.message,
    });
  }
};

module.exports = {
  adminOnly,
};