import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users").then(r => r.json()).then(setUsers);
    fetch("http://localhost:5000/api/courses").then(r => r.json()).then(setCourses);
    fetch("http://localhost:5000/api/sessions").then(r => r.json()).then(setSessions);
  }, []);

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px" }}>
      <h1>StudyFlow</h1>
      <p>A simple study tracker for students to manage courses and study sessions.</p>

      <section>
        <h2>Users</h2>
        {users.map(user => (
          <div key={user._id} style={{ border: "1px solid #777", padding: "12px", marginBottom: "10px" }}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            <p>{user.program}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Courses</h2>
        {courses.map(course => (
          <div key={course._id} style={{ border: "1px solid #777", padding: "12px", marginBottom: "10px" }}>
            <strong>{course.name}</strong>
            <p>Difficulty: {course.difficultyLevel}/5</p>
            <p>Exam: {new Date(course.examDate).toLocaleDateString()}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Study Sessions</h2>
        {sessions.map(session => (
          <div key={session._id} style={{ border: "1px solid #777", padding: "12px", marginBottom: "10px" }}>
            <strong>{session.topic}</strong>
            <p>Course: {session.courseId?.name}</p>
            <p>Duration: {session.duration} minutes</p>
            <p>Focus: {session.focusLevel}/10 | Energy: {session.energyLevel}/10</p>
            <p>{session.notes}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
