import React, { useState, useEffect } from "react";
import "./adminstaff.css";

const AdminStaff = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [questionnaire, setQuestionnaire] = useState({ title: '', questions: [''] });
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/users/teachers')
      .then(res => res.json())
      .then(data => {
        setTeachers(data.teachers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleTeacherSelect = (e) => {
    const teacherId = e.target.value;
    setSelectedTeacher(teachers.find(t => t.id === parseInt(teacherId)));
  };

  const handleQuestionChange = (idx, value) => {
    const updated = [...questionnaire.questions];
    updated[idx] = value;
    setQuestionnaire({ ...questionnaire, questions: updated });
  };

  const addQuestion = () => {
    setQuestionnaire({ ...questionnaire, questions: [...questionnaire.questions, ''] });
  };

  const removeQuestion = (idx) => {
    if (questionnaire.questions.length > 1) {
      const updated = questionnaire.questions.filter((_, i) => i !== idx);
      setQuestionnaire({ ...questionnaire, questions: updated });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emptyFields = questionnaire.questions.filter(q => !q.trim());
    if (!selectedTeacher) {
      setSuccess('Please select a teacher.');
      return;
    }
    if (!questionnaire.title.trim()) {
      setSuccess('Please enter a questionnaire title.');
      return;
    }
    if (emptyFields.length > 0) {
      setSuccess(`Please fill all ${emptyFields.length} empty question(s).`);
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/questionnaire/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: selectedTeacher.id,
          title: questionnaire.title,
          questions: questionnaire.questions
        })
      });

      if (res.ok) {
        setSuccess('✅ Questionnaire created successfully!');
        setQuestionnaire({ title: '', questions: [''] });
        setSelectedTeacher(null);
        setTimeout(() => setSuccess(''), 4000);
      } else {
        const data = await res.json();
        setSuccess(`❌ ${data.message || 'Failed to create questionnaire.'}`);
      }
    } catch (err) {
      setSuccess('❌ Server error. Please try again.');
    }
  };

  return (
    <div className="admin-staff-container">
      <h2>📋 Create Teacher Questionnaire</h2>
      
      <form onSubmit={handleSubmit} className="staff-form">
        <div className="form-group">
          <label htmlFor="teacher-select">Select Teacher *</label>
          <select 
            id="teacher-select"
            value={selectedTeacher?.id || ''} 
            onChange={handleTeacherSelect} 
            required
            disabled={loading}
          >
            <option value="">{loading ? 'Loading teachers...' : '-- Select a Teacher --'}</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>
                {t.username} ({t.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title-input">Questionnaire Title *</label>
          <input 
            id="title-input"
            type="text" 
            placeholder="e.g., Teaching Effectiveness Survey"
            value={questionnaire.title} 
            onChange={e => setQuestionnaire({ ...questionnaire, title: e.target.value })} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Questions ({questionnaire.questions.length}) *</label>
          <div className="questions-container">
            {questionnaire.questions.map((q, idx) => (
              <div key={idx} className="question-input">
                <span className="question-number">Q{idx + 1}</span>
                <input 
                  type="text" 
                  placeholder={`Enter question ${idx + 1}...`}
                  value={q} 
                  onChange={e => handleQuestionChange(idx, e.target.value)} 
                  required 
                />
                {questionnaire.questions.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeQuestion(idx)}
                    style={{
                      padding: '8px 12px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="btn-group">
          <button 
            type="button" 
            onClick={addQuestion}
            className="btn-add-question"
          >
            ➕ Add Question
          </button>
          <button 
            type="submit"
            className="btn-submit"
          >
            ✓ Create Questionnaire
          </button>
        </div>
      </form>

      {success && (
        <div className={success.includes('✅') ? 'success-message' : 'error-message'}>
          {success}
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
