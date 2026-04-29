function StudySessionList({ sessions, onEdit, onDelete }) {
  if (sessions.length === 0) {
    return <p>No study sessions found.</p>;
  }

  return (
    <section>
      <h2>Study Sessions</h2>

      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Course</th>
            <th>User</th>
            <th>Duration</th>
            <th>Focus</th>
            <th>Energy</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>{session.topic}</td>
              <td>{session.courseId?.name}</td>
              <td>{session.userId?.name}</td>
              <td>{session.duration} min</td>
              <td>{session.focusLevel}/10</td>
              <td>{session.energyLevel}/10</td>
              <td>
                <button onClick={() => onEdit(session)}>Edit</button>
                <button className="danger" onClick={() => onDelete(session._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default StudySessionList;
