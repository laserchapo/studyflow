import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost, apiPut } from "./api";
import Dashboard from "./components/Dashboard";
import StudySessionForm from "./components/StudySessionForm";
import StudySessionList from "./components/StudySessionList";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");
      const [usersData, coursesData, sessionsData] = await Promise.all([
        apiGet("/users"),
        apiGet("/courses"),
        apiGet("/sessions")
      ]);

      setUsers(usersData);
      setCourses(coursesData);
      setSessions(sessionsData);
    } catch (err) {
      setError("Could not load data. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const intervalId = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmitSession = async (formData) => {
    try {
      if (selectedSession) {
        await apiPut(`/sessions/${selectedSession._id}`, formData);
        setSelectedSession(null);
      } else {
        await apiPost("/sessions", formData);
      }

      await loadData();
    } catch (err) {
      setError("Could not save study session.");
    }
  };

  const handleDeleteSession = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this study session?");
    if (!confirmed) return;

    try {
      await apiDelete(`/sessions/${id}`);
      await loadData();
    } catch (err) {
      setError("Could not delete study session.");
    }
  };

  const filteredSessions = sessions.filter((session) =>
    session.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container">
      <h1>StudyFlow</h1>
      <p className="subtitle">A study tracker for managing courses, focus, and study sessions.</p>

      {loading && <p>Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <>
          <Dashboard
            users={users}
            courses={courses}
            sessions={sessions}
            search={search}
            setSearch={setSearch}
          />

          <StudySessionForm
            users={users}
            courses={courses}
            selectedSession={selectedSession}
            onSubmit={handleSubmitSession}
            onCancel={() => setSelectedSession(null)}
          />

          <StudySessionList
            sessions={filteredSessions}
            onEdit={setSelectedSession}
            onDelete={handleDeleteSession}
          />
        </>
      )}
    </main>
  );
}

export default App;
