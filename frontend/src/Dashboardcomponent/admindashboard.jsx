import React, { useEffect, useState } from "react";
import './dashboard.css';
import { catalogsData } from '../data/coursecatalog';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    catalogId: 1,
    department: '',
    code: '',
    title: '',
    description: '',
    credits: 3,
    type: 'core',
    instructorId: null,
    instructorName: '',
    email: '',
    capacity: 30,
    semester: '',
    scheduleDays: 'Monday,Wednesday',
    scheduleTime: '',
    scheduleRoom: '',
    lmsLink: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/teachers');
      const data = await res.json();
      if (res.ok) setTeachers(data.teachers || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      catalogId: parseInt(form.catalogId),
      department: form.department || catalogsData.find(c=>c.id===parseInt(form.catalogId))?.name || '',
      code: form.code,
      title: form.title,
      description: form.description,
      credits: parseInt(form.credits),
      type: form.type,
      instructorId: form.instructorId ? parseInt(form.instructorId) : null,
      instructorName: form.instructorId ? (teachers.find(t=>t.id===parseInt(form.instructorId))?.username || '') : form.instructorName,
      email: form.email,
      capacity: parseInt(form.capacity),
      semester: form.semester,
      schedule: {
        days: form.scheduleDays.split(',').map(d => d.trim()),
        time: form.scheduleTime,
        room: form.scheduleRoom
      },
      lmsLink: form.lmsLink
    };

    try {
      const res = await fetch('http://localhost:5000/api/courses/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Course created successfully');
        // reset minimal fields
        setForm({ ...form, code: '', title: '', description: '' });
      } else {
        alert(data.message || 'Failed to create course');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dash-title">Admin Dashboard — Add Course</h1>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Category</label>
            <select value={form.catalogId} onChange={(e)=>handleChange('catalogId', e.target.value)}>
              {catalogsData.map(cat=> (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Course Code</label>
            <input value={form.code} onChange={e=>handleChange('code', e.target.value)} required />
          </div>

          <div className="form-row">
            <label>Title</label>
            <input value={form.title} onChange={e=>handleChange('title', e.target.value)} required />
          </div>

          <div className="form-row">
            <label>Assign Teacher</label>
            <select value={form.instructorId || ''} onChange={(e)=>handleChange('instructorId', e.target.value)}>
              <option value=''>-- Select teacher --</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.username} ({t.email})</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Credits</label>
            <input type='number' value={form.credits} onChange={e=>handleChange('credits', e.target.value)} />
          </div>

          <div className="form-row">
            <label>Capacity</label>
            <input type='number' value={form.capacity} onChange={e=>handleChange('capacity', e.target.value)} />
          </div>

          <div className="form-row">
            <label>Semester</label>
            <input value={form.semester} onChange={e=>handleChange('semester', e.target.value)} />
          </div>

          <div className="form-row">
            <label>Schedule</label>
            <input placeholder="Mon,Wed 10:00-11:30 Room 101" value={form.scheduleTime} onChange={e=>handleChange('scheduleTime', e.target.value)} />
          </div>

          <div className="form-row full">
            <label>Description</label>
            <textarea value={form.description} onChange={e=>handleChange('description', e.target.value)} />
          </div>

          <div className="form-actions">
            <button type='submit' className='dash-btn'>Create Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
