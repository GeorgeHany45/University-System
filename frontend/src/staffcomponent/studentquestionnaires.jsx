import React, { useEffect, useState } from "react";
import "./studentquestionnaires.css";

const StudentQuestionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [answers, setAnswers] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5001/api/questionnaire/student/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setQuestionnaires(data.questionnaires || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [studentId]);

  const handleAnswerChange = (qId, idx, value) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        [idx]: value
      }
    }));
  };

  const handleSubmit = (qId) => {
    const questionnaireAnswers = answers[qId];
    if (!questionnaireAnswers || Object.keys(questionnaireAnswers).length === 0) {
      setSuccess('❌ Please answer all questions before submitting.');
      setTimeout(() => setSuccess(''), 3000);
      return;
    }

    // Placeholder: Backend endpoint for answers not yet implemented
    setSuccess('✅ Submitted! Thank you for completing the questionnaire.');
    setTimeout(() => setSuccess(''), 3000);
  };

  if (loading) {
    return (
      <div className="student-questionnaires-container">
        <h2>Loading questionnaires...</h2>
      </div>
    );
  }

  return (
    <div className="student-questionnaires-container">
      <h2>📊 Teacher Questionnaires</h2>
      
      {questionnaires.length === 0 ? (
        <div className="no-questionnaires">
          <p>No questionnaires available for your courses yet.</p>
        </div>
      ) : (
        <>
          {questionnaires.map(q => (
            <div key={q.id} className="questionnaire-block">
              <h3>{q.title}</h3>
              <form className="questionnaire-form" onSubmit={e => { e.preventDefault(); handleSubmit(q.id); }}>
                {q.questions.map((question, idx) => (
                  <div key={idx} className="question-block">
                    <label>
                      <strong>Question {idx + 1}:</strong> {question}
                    </label>
                    <textarea
                      placeholder="Enter your answer..."
                      value={answers[q.id]?.[idx] || ''}
                      onChange={e => handleAnswerChange(q.id, idx, e.target.value)}
                      rows="3"
                      required
                    />
                  </div>
                ))}
                <button 
                  type="submit"
                  className="questionnaire-button"
                >
                  ✓ Submit Answers
                </button>
              </form>
            </div>
          ))}
        </>
      )}

      {success && (
        <div className={success.includes('✅') ? 'success-notification' : 'error-notification'}>
          {success}
        </div>
      )}
    </div>
  );
};

export default StudentQuestionnaires;
