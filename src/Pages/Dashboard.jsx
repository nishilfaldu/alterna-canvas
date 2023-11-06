import Announcements from "../components/dashboardComponents/Announcements";
import CourseCard from "../components/dashboardComponents/CourseCard";
import PlantStatus from "../components/dashboardComponents/PlantStatus";
import Todo from "../components/dashboardComponents/ToDo";




const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Dashboard</h1>
      <hr style={{ width: "90%" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <CourseCard />
        <div style={{ display: "flex", flexDirection: "column", paddingTop: "20px" }}>
          <Todo />
          <Announcements />
        </div>
      </div>
      <PlantStatus />
    </div>
  );
};

export default Dashboard;

