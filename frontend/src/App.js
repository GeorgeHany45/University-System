import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./navbarcomponent/navbar";
import Login from "./loginpagecomponent/loginpages";
import HomePage from "./homepagecomponent/homepage";
import StudentDashboard from "./Dashboardcomponent/studentdashboard";
import TeacherDashboard from "./Dashboardcomponent/teacherdashboard";
import CatalogCard from "./coursescomponent/coursecatalog";
import MyCourses from "./Dashboardcomponent/mycourses";
import AdminDashboard from "./Dashboardcomponent/admindashboard";
import ViewAssignments from "./assignmentscomponent/viewassignments";
import AssignmentDetails from "./assignmentscomponent/assignmentdetails";
import ViewGrades from "./Dashboardcomponent/viewgrades";
import Notfound from "./notFound";
import UploadAssignment from "./teacher/UploadAssignment";
import UploadGrades from "./teacher/UploadGrades";
import Community from "./communitycomponent/community";
import AdminStaff from "./staffcomponent/adminstaff";
import StudentQuestionnaires from "./staffcomponent/studentquestionnaires";
import StaffPublic from "./staffcomponent/staffpublic";

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
        <Route path="/student-dashboard/addcourse" element={<CatalogCard />} />
        <Route path="/student-dashboard/mycourses" element={<MyCourses />} />
        <Route path="/student-dashboard/assignments" element={<ViewAssignments />}/>
        <Route path="/student-dashboard/assignments/:id" element={<AssignmentDetails />}/>
        <Route path="/student-dashboard/grades" element={<ViewGrades />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/teacher/upload-assignment" element={<UploadAssignment />}/>
        <Route path="/upload-grades" element={<UploadGrades />} />
        {/* Public staff directory */}
        <Route path="/staff" element={<StaffPublic />} />
        {/* Admin staff questionnaire page */}
        <Route path="/admin/staff" element={<AdminStaff />} />
        {/* Student: answer teacher questionnaires */}
        <Route path="/student-dashboard/questionnaires" element={<StudentQuestionnaires />} />
      </Routes>
    </div>
  );
}

export default App;
