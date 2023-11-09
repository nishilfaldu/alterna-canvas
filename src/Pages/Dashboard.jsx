import { Container, Row, Col } from "react-bootstrap";

import Announcements from "../components/dashboardComponents/Announcements";
import CourseCard from "../components/dashboardComponents/CourseCard";
import PlantStatus from "../components/dashboardComponents/PlantStatus";
import Todo from "../components/dashboardComponents/ToDo";



const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <h1>Dashboard</h1>
          <hr />
          <CourseCard />
        </Col>
        <Col>
          <Todo />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col lg={8}>
          <PlantStatus />
        </Col>
        <Col>
          <Announcements />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
