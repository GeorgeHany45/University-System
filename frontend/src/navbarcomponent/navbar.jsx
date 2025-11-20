import { NavLink} from 'react-router-dom';
import './navbar.css';

const Navbar = () => {


    // Get logged-in role
    const role = localStorage.getItem("role");

    // Decide dashboard path
    const dashboardPath =
        role === "student" ? "/student-dashboard"
        : role === "teacher" ? "/teacher-dashboard"
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

                {/* Staff */}
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
            </div>
        </nav>
    );
};

export default Navbar;
