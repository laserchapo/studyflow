function Dashboard({ users, courses, sessions, search, setSearch }) {
  return (
    <section className="dashboard">
      <div className="card">
        <h2>Users</h2>
        <p>{users.length}</p>
      </div>

      <div className="card">
        <h2>Courses</h2>
        <p>{courses.length}</p>
      </div>

      <div className="card">
        <h2>Study Sessions</h2>
        <p>{sessions.length}</p>
      </div>

      <div className="card">
        <h2>Search</h2>
        <input
          placeholder="Search sessions by topic..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </section>
  );
}

export default Dashboard;
