import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './navbarcomponent/navbar';
import Login from './loginpagecomponent/loginpages';
import HomePage from './homepagecomponent/homepage';
import StudentDashboard from './Dashboardcomponent/studentdashboard';
import TeacherDashboard from './Dashboardcomponent/teacherdashboard';
import CatalogCard from './coursescomponent/coursecatalog';
import Notfound from './notFound';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <div className="App">
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path='/student-dashboard/addcourse' element ={<CatalogCard/>}/>
        <Route path='*' element={<Notfound/>} />
      </Routes>
    </div>
  );
}

export default App;
