import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", {
        name,
        description,
      });

      setName("");
      setDescription("");

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <h1>Projects</h1>

      <div className="project-layout">
        <div className="project-form-card">
          <h2>Create Project</h2>

          <form onSubmit={createProject}>
            <input
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Create Project</button>
          </form>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="project-card"
            >
              <h3>{project.name}</h3>

              <p>{project.description}</p>

              <small>
                Members: {project.members?.length || 0}
              </small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;