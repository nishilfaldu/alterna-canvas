import Announcements from "../components/dashboardComponents/Announcements";
import CourseCard from "../components/dashboardComponents/CourseCard";
import PlantStatus from "../components/dashboardComponents/PlantStatus";
import Todo from "../components/dashboardComponents/ToDo";
import { useUser } from "../components/provider/useUser";



const Dashboard = () => {
  const { user } = useUser();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* TODO: this HI can be positioned somewhere else */}
      <h1>Dashboard {`(Hi, ${user})`}</h1>
      <hr style={{ width: "80%" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <CourseCard />
        <div style={{ display: "flex", flexDirection: "column", marginRight: "0 !important", paddingTop: "20px" }}>
          <Todo />
          <Announcements />
        </div>
      </div>
      <PlantStatus />
    </div>
  );
};

export default Dashboard;
