import React, { useEffect, useState } from "react";
import './dashboard.css';
import { catalogsData } from '../data/coursecatalog';
import { coursesData } from '../data/coursedata';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [existingCourses, setExistingCourses] = useState([]); // Courses already in database
  const [selectedCatalogId, setSelectedCatalogId] = useState(1);
  const [form, setForm] = useState({
    courseId: '', // Selected course from catalog
    instructorId: null,
    capacity: 30,
    semester: '',
    scheduleDays: 'Monday,Wednesday',
    scheduleTime: '',
    scheduleRoom: '',
  });

  useEffect(() => {
    fetchTeachers();
    fetchExistingCourses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/users/teachers');
      const data = await res.json();
      if (res.ok) setTeachers(data.teachers || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExistingCourses = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/courses/all');
      const data = await res.json();
      if (res.ok) setExistingCourses(data.courses || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Get courses from catalog data filtered by selected category
  const getCatalogCourses = () => {
    return coursesData.filter(course => course.catalogId === parseInt(selectedCatalogId));
  };

  // Get selected course details
  const getSelectedCourse = () => {
    if (!form.courseId) return null;
    return coursesData.find(c => c.id === parseInt(form.courseId));
  };

  const getAvailableRooms = () => {
    const allRooms = Array.from({ length: 13 }, (_, i) => 900 + i);
    
    // If no days or time selected, show all rooms
    if (!form.scheduleDays || !form.scheduleTime) return allRooms;

    const selectedDays = form.scheduleDays.split(',').map(d => d.trim());
    
    // Find booked rooms for the selected days and time
    const bookedRooms = existingCourses
      .filter(course => {
        if (!course.schedule) return false;
        
        const courseTime = course.schedule.time;
        const courseDays = course.schedule.days || [];
        
        // Check if there's overlap in days and time
        const hasDayOverlap = courseDays.some(day => selectedDays.includes(day));
        const hasTimeOverlap = courseTime === form.scheduleTime;
        
        return hasDayOverlap && hasTimeOverlap;
      })
      .map(course => {
        const room = course.schedule?.room;
        return typeof room === 'string' ? parseInt(room.replace(/\D/g, '')) : parseInt(room);
      })
      .filter(room => !isNaN(room));

    // Return only available rooms (not booked)
    return allRooms.filter(room => !bookedRooms.includes(room));
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCourse = getSelectedCourse();
    if (!selectedCourse) {
      alert('Please select a course from the catalog');
      return;
    }

    if (!form.instructorId) {
      alert('Please select a teacher to assign');
      return;
    }

    const selectedTeacher = teachers.find(t => t.id === parseInt(form.instructorId));
    if (!selectedTeacher) {
      alert('Selected teacher not found');
      return;
    }

    const payload = {
      catalogId: selectedCourse.catalogId,
      department: selectedCourse.department,
      code: selectedCourse.code,
      title: selectedCourse.title,
      description: selectedCourse.description,
      credits: selectedCourse.credits,
      type: selectedCourse.type,
      instructorId: parseInt(form.instructorId),
      instructorName: selectedTeacher.username,
      email: selectedTeacher.email,
      capacity: parseInt(form.capacity),
      semester: form.semester,
      schedule: {
        days: form.scheduleDays.split(',').map(d => d.trim()),
        time: form.scheduleTime,
        room: form.scheduleRoom
      },
      lmsLink: selectedCourse.lmsLink || '',
      prerequisites: selectedCourse.prerequisites || []
    };

    try {
      const res = await fetch('http://localhost:5001/api/courses/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Course assigned to teacher successfully!');
        // Reset form
        setForm({
          courseId: '',
          instructorId: null,
          capacity: 30,
          semester: '',
          scheduleDays: 'Monday,Wednesday',
          scheduleTime: '',
          scheduleRoom: '',
        });
        // Refresh courses list
        fetchExistingCourses();
      } else {
        alert(data.message || 'Failed to assign course');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  const selectedCourse = getSelectedCourse();

  return (
    <div className="dashboard-container">
      <h1 className="dash-title">Admin Dashboard — Assign Course to Teacher</h1>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Course Category</label>
            <select 
              value={selectedCatalogId} 
              onChange={(e) => {
                setSelectedCatalogId(parseInt(e.target.value));
                setForm({ ...form, courseId: '' }); // Reset course selection when category changes
              }}
            >
              {catalogsData.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Select Course from Catalog</label>
            <select 
              value={form.courseId} 
              onChange={(e) => handleChange('courseId', e.target.value)}
              required
            >
              <option value="">-- Select a course --</option>
              {getCatalogCourses().map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title} ({course.credits} credits)
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="form-row full" style={{ 
              padding: '15px', 
              background: '#f0f7ff', 
              borderRadius: '8px',
              marginBottom: '15px',
              borderLeft: '4px solid #2196f3'
            }}>
              <strong>Selected Course Details:</strong>
              <p><strong>Code:</strong> {selectedCourse.code}</p>
              <p><strong>Title:</strong> {selectedCourse.title}</p>
              <p><strong>Description:</strong> {selectedCourse.description}</p>
              <p><strong>Credits:</strong> {selectedCourse.credits}</p>
              <p><strong>Type:</strong> {selectedCourse.type}</p>
            </div>
          )}

          <div className="form-row">
            <label>Assign Teacher</label>
            <select 
              value={form.instructorId || ''} 
              onChange={(e) => handleChange('instructorId', e.target.value)}
              required
            >
              <option value="">-- Select teacher --</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.username} ({t.email})</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Capacity</label>
            <input type='number' value={form.capacity} onChange={e=>handleChange('capacity', e.target.value)} />
          </div>

          <div className="form-row">
            <label>Semester</label>
            <select value={form.semester} onChange={(e)=>handleChange('semester', e.target.value)}>
              <option value="">-- Select semester --</option>
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          <div className="form-row">
            <label>Schedule Days</label>
            <select value={form.scheduleDays} onChange={(e)=>handleChange('scheduleDays', e.target.value)}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Monday,Wednesday">Monday, Wednesday</option>
              <option value="Tuesday,Thursday">Tuesday, Thursday</option>
              <option value="Monday,Wednesday,Friday">Monday, Wednesday, Friday</option>
            </select>
          </div>

          <div className="form-row">
            <label>Time</label>
            <input type="time" value={form.scheduleTime} onChange={e=>handleChange('scheduleTime', e.target.value)} />
          </div>

          <div className="form-row">
            <label>Room</label>
            <select value={form.scheduleRoom} onChange={(e)=>handleChange('scheduleRoom', e.target.value)}>
              <option value="">-- Select room --</option>
              {getAvailableRooms().map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type='submit' className='dash-btn'>Assign Course to Teacher</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
