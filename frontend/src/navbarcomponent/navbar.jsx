import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {


    // Get logged-in role
    const role = localStorage.getItem("role");

    // Decide dashboard path
    const dashboardPath =
        role === "student" ? "/student-dashboard"
        : role === "teacher" ? "/teacher-dashboard"
        : role === "admin" ? "/admin-dashboard"
        : "/home";

    return (
        <nav className="container">
            <div className='top-header'>
                <h1>University Management System</h1>
            </div>

            <div className='nav-bar'>
                {/* Home */}
                <NavLink 
                    to='/home'
                    style={({ isActive }) => ({
                        color: isActive ? '#ff6b35' : '#ffffff',
                        borderBottom: isActive ? '3px solid #ff6b35' : 'none',
                        paddingBottom: isActive ? '20px' : '0'
                    })}
                >
                    Home
                </NavLink>

                {/* Dashboard (dynamic route) */}
                <NavLink
                    to={dashboardPath}
                    style={({ isActive }) => ({
                        color: isActive ? '#ff6b35' : '#ffffff',
                        borderBottom: isActive ? '3px solid #ff6b35' : 'none',
                        paddingBottom: isActive ? '20px' : '0'
                    })}
                >
                    Dashboard
                </NavLink>


                {/* Staff directory (public) */}
                <NavLink 
                    to='/staff'
                    style={({ isActive }) => ({
                        color: isActive ? '#ff6b35' : '#ffffff',
                        borderBottom: isActive ? '3px solid #ff6b35' : 'none',
                        paddingBottom: isActive ? '20px' : '0'
                    })}
                >
                    Staff
                </NavLink>

                {/* Admin staff tools */}
                {role === 'admin' && (
                  <NavLink 
                      to='/admin/staff'
                      style={({ isActive }) => ({
                          color: isActive ? '#ff6b35' : '#ffffff',
                          borderBottom: isActive ? '3px solid #ff6b35' : 'none',
                          paddingBottom: isActive ? '20px' : '0'
                      })}
                  >
                      Admin Staff
                  </NavLink>
                )}

                {/* Community */}
                <NavLink 
                    to='/community'
                    style={({ isActive }) => ({
                        color: isActive ? '#ff6b35' : '#ffffff',
                        borderBottom: isActive ? '3px solid #ff6b35' : 'none',
                        paddingBottom: isActive ? '20px' : '0'
                    })}
                >
                    Community
                </NavLink>
                
                {/* Logout button */}
                <button
                    onClick={() => {
                        // Clear stored user info and redirect to login
                        localStorage.removeItem("userId");
                        localStorage.removeItem("role");
                        localStorage.removeItem("username");
                        // use window.location to ensure full reset
                        window.location.href = "/";
                    }}
                    className="logout-btn"
                    style={{
                        marginLeft: '16px',
                        background: 'transparent',
                        border: '1px solid #ffffff',
                        color: '#ffffff',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
