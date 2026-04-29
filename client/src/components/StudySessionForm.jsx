import { useEffect, useState } from "react";

function StudySessionForm({ users, courses, selectedSession, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
    date: "",
    duration: "",
    topic: "",
    notes: "",
    focusLevel: "",
    energyLevel: ""
  });

  useEffect(() => {
    if (selectedSession) {
      setFormData({
        userId: selectedSession.userId?._id || selectedSession.userId || "",
        courseId: selectedSession.courseId?._id || selectedSession.courseId || "",
        date: selectedSession.date ? selectedSession.date.slice(0, 10) : "",
        duration: selectedSession.duration || "",
        topic: selectedSession.topic || "",
        notes: selectedSession.notes || "",
        focusLevel: selectedSession.focusLevel || "",
        energyLevel: selectedSession.energyLevel || ""
      });
    }
  }, [selectedSession]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...formData,
      duration: Number(formData.duration),
      focusLevel: Number(formData.focusLevel),
      energyLevel: Number(formData.energyLevel)
    });

    if (!selectedSession) {
      setFormData({
        userId: "",
        courseId: "",
        date: "",
        duration: "",
        topic: "",
        notes: "",
        focusLevel: "",
        energyLevel: ""
      });
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{selectedSession ? "Update Study Session" : "Create Study Session"}</h2>

      <select name="userId" value={formData.userId} onChange={handleChange} required>
        <option value="">Select user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      <select name="courseId" value={formData.courseId} onChange={handleChange} required>
        <option value="">Select course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>{course.name}</option>
        ))}
      </select>

      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="duration" type="number" min="1" placeholder="Duration in minutes" value={formData.duration} onChange={handleChange} required />
      <input name="topic" placeholder="Topic" value={formData.topic} onChange={handleChange} required />
      <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>
      <input name="focusLevel" type="number" min="1" max="10" placeholder="Focus level 1-10" value={formData.focusLevel} onChange={handleChange} required />
      <input name="energyLevel" type="number" min="1" max="10" placeholder="Energy level 1-10" value={formData.energyLevel} onChange={handleChange} required />

      <div className="actions">
        <button type="submit">{selectedSession ? "Update" : "Create"}</button>
        {selectedSession && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default StudySessionForm;
