import CourseCard from "../components/dashboardComponents/CourseCard";
import "../styles/dashboard.css";



const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <hr style={{ width: "90%" }} />
      <CourseCard />
    </div>
  );
};

export default Dashboard;


