import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Announcements from "../components/dashboardComponents/Announcements";
import CourseCard from "../components/dashboardComponents/CourseCard";
import Todo from "../components/dashboardComponents/Todo";
import PlantComp from "../components/PlantComp";
import { useUser } from "../components/provider/useUser";
import { getData } from "../scripts/jsonHelpers";

const Dashboard = () => {
  const { user } = useUser();
  const [gardenPic, setGardenPic] = useState();

  useEffect(() => {
    // Function to fetch and update garden image
    const updateGardenImage = async () => {
      if (user) {
        const names = user.split(" ");
        const firstName = names[0];
        const lastName = names[1];
        const userData = await getData(
          `http://localhost:3030/students?name=${firstName}+${lastName}`
        );

        setGardenPic(userData[0].currentGardenImage);
      }
    };

    // Fetch and update garden image initially
    updateGardenImage();

    // Set up an interval to fetch and update the garden image every second
    const intervalId = setInterval(() => {
      updateGardenImage();
    }, 1000); // 1 second

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Dashboard</h2>
            <span>Welcome, {user}!</span>
          </header>
          <hr />
          <CourseCard />
        </Col>
        <Col>
          <Todo />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col lg={8}>
          <PlantComp isDashboard={true} />
        </Col>
        <Col>
          <Announcements />
        </Col>
      </Row>
      <img
        src={gardenPic}
        style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}
        alt="Garden"
      />
    </Container>
  );
};

export default Dashboard;
