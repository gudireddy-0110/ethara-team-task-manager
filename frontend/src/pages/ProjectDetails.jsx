import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function ProjectDetails() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    assignedToId: "",
  });

  const fetchTasks = async () => {
    try {
      const taskRes = await API.get(`/tasks/${projectId}`);
      setTasks(taskRes.data);

      const projectRes = await API.get("/projects");

      const currentProject = projectRes.data.find(
        (p) => p.id === projectId
      );

      setProject(currentProject);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/tasks/${projectId}`, form);

      setForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
        assignedToId: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.patch(`/tasks/status/${taskId}`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <div className="navbar">
        <h2>Team Task Manager</h2>

        <div>
          <a href="/dashboard">Dashboard</a>
          <a href="/projects">Projects</a>
        </div>
      </div>

      <h1>Project Tasks</h1>

      <div className="project-layout">
        <div className="project-form-card">
          <h2>Create Task</h2>

          <form onSubmit={createTask}>
            <input
              name="title"
              placeholder="Task Title"
              value={form.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <select
              name="assignedToId"
              value={form.assignedToId}
              onChange={handleChange}
            >
              <option value="">Select Team Member</option>

              {project?.members?.map((member) => (
                <option
                  key={member.user.id}
                  value={member.user.id}
                >
                  {member.user.name}
                </option>
              ))}
            </select>

            <button type="submit">Create Task</button>
          </form>
        </div>

        <div className="project-list">
          {tasks.map((task) => (
            <div className="project-card" key={task.id}>
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                <strong>Status:</strong> {task.status}
              </p>

              <p>
                <strong>Priority:</strong> {task.priority}
              </p>

              <p>
                <strong>Assigned To:</strong>{" "}
                {task.assignedTo?.name}
              </p>

              <div className="task-actions">
                <button
                  onClick={() =>
                    updateStatus(task.id, "TODO")
                  }
                >
                  TODO
                </button>

                <button
                  onClick={() =>
                    updateStatus(task.id, "IN_PROGRESS")
                  }
                >
                  IN PROGRESS
                </button>

                <button
                  onClick={() =>
                    updateStatus(task.id, "DONE")
                  }
                >
                  DONE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;