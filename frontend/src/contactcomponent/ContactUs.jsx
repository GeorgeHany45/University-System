import './contactus.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you. This is a styled showcase-only contact page.</p>

          <div className="info-row">
            <strong>Email:</strong>
            <span>support@university.edu</span>
          </div>
          <div className="info-row">
            <strong>Phone:</strong>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="info-row">
            <strong>Address:</strong>
            <span>123 University Ave, City, State</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>

          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            Message
            <textarea rows="5" placeholder="Write your message here..." />
          </label>

          <button className="submit-btn">Send Message </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
