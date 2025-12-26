import './homepage.css'

const Homepage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="imagepart">
                <img src="/homepage.png" alt="University Campus" />
                <h1>University Management System</h1>
                <p>Welcome to our <strong>University Management System</strong><br></br>
    Shaping minds, inspiring growth, and preparing leaders for tomorrow.</p>
                <div className='button'>
                   <button>Contact Us</button> 
                </div>
            </div>

            {/* Feature Cards Section */}
            <section className="features-section">
                <div className="feature-card facilities">
                    <div className="feature-icon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <path d="M3 9h18"/>
                            <path d="M9 21V9"/>
                        </svg>
                    </div>
                    <h3>Facilities Management</h3>
                    <p>Access classroom booking, laboratory scheduling, and resource allocation. Manage university infrastructure efficiently.</p>
                </div>

                <div className="feature-card curriculum">
                    <div className="feature-icon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                    </div>
                    <h3>Curriculum Module</h3>
                    <p>Browse courses, manage assignments, view grades, and access integrated learning management systems for your education.</p>
                </div>

                <div className="feature-card staff">
                    <div className="feature-icon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <h3>Staff Directory</h3>
                    <p>Connect with professors and teaching assistants. View office hours, contact information, and academic staff profiles.</p>
                </div>

                <div className="feature-card community">
                    <div className="feature-icon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </div>
                    <h3>Community Hub</h3>
                    <p>Stay connected with announcements, events, and important updates. Communicate with teachers and parents effectively.</p>
                </div>
            </section>
        </div>
    )
}

export default Homepage