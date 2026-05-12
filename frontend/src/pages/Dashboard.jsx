import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="page">
      <nav className="navbar">
        <h2>Team Task Manager</h2>
        <div>
          <Link to="/projects">Projects</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <section className="hero">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </section>

      {error && <p className="error">{error}</p>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{stats.totalTasks}</p>
          </div>

          <div className="stat-card">
            <h3>To Do</h3>
            <p>{stats.tasksByStatus?.TODO || 0}</p>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{stats.tasksByStatus?.IN_PROGRESS || 0}</p>
          </div>

          <div className="stat-card">
            <h3>Done</h3>
            <p>{stats.tasksByStatus?.DONE || 0}</p>
          </div>

          <div className="stat-card warning">
            <h3>Overdue Tasks</h3>
            <p>{stats.overdueTasks}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;