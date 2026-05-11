const express = require("express");

const {
  createProject,
  getProjects,
  addMember,
  removeMember,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getProjects);

router.post(
  "/:projectId/members",
  authMiddleware,
  adminOnly,
  addMember
);
router.delete(
  "/:projectId/members/:memberId",
  authMiddleware,
  adminOnly,
  removeMember
);
module.exports = router;