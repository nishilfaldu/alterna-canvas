import { Container, Row, Col } from "react-bootstrap";

import Announcements from "../components/dashboardComponents/Announcements";
import CourseCard from "../components/dashboardComponents/CourseCard";
import Todo from "../components/dashboardComponents/Todo";
import PlantComp from "../components/PlantComp";
import { useUser } from "../components/provider/useUser";



const Dashboard = () => {
  const { user } = useUser();

  return (
    <Container>
      <Row>
        <Col lg={8}>
          {/* TODO: this HI can be positioned somewhere else */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>Dashboard</h1>
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
    </Container>
  );
};

export default Dashboard;
