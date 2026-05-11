const express = require("express");

const {
  createTask,
  getProjectTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/:projectId",
  authMiddleware,
  adminOnly,
  createTask
);

router.get(
  "/:projectId",
  authMiddleware,
  getProjectTasks
);

router.patch(
  "/status/:taskId",
  authMiddleware,
  updateTaskStatus
);

module.exports = router;