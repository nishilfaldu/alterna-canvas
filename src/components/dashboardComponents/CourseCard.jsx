import { Card } from "antd";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";



const { Meta } = Card;

const CustomCard = ({ title, link, image }) => {
  return (
    //TODO: Switch out the Link to logic

    <Link to={link} style={{ textDecoration: "none" }}>
      <Card
        hoverable
        style={{
          cursor: "pointer",
          height: "100%",
        }}
        cover={<img alt="example" src={image} style={{ height: 150 }} />}
      >
        <Meta title={title} description="Fall Semester 2023" />
      </Card>
    </Link>
  );
};

CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const CourseCard = () => {
  return (
    <Container style={{ marginBottom: 30 }}>
      <Row>
        <Col>
          <CustomCard
            title="User Interface"
            link="/course/ui"
            image="/courseImages/UI-course-image.png"
          />
        </Col>
        <Col>
          <CustomCard
            title="Computer Graphics"
            link="/course/computer_graphics"
            image="/courseImages/graphics-course-image.jpg"
          />
        </Col>
        <Col>
          <CustomCard
            title="Senior Design"
            link="/course/senior_design"
            image="/courseImages/senior-design-course-image.png"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CourseCard;
