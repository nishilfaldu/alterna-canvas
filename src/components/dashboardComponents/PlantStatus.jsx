import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import { MdOutlineWaterDrop } from "react-icons/md";



const PlantStatus = () => {
  // TODO: dynamically set these values
  const currentHealth = 2;
  const totalHealth = 15;
  const plantName = "Name of Plant";
  const waterAvailable = 4;
  const daysUntilWilted = 3;

  return (
    <Container>
      <Row>
        <Col>TODO: Add plant image here</Col>
        <Col lg={9}>
          <h2 style={{marginBottom: 20}}>{plantName}</h2>
          <ProgressBar
            now={(currentHealth / totalHealth) * 100}
            label={`${Math.round((currentHealth / totalHealth) * 100)}%`}
          />
          <p
            style={{
              display: "flex",
              margin: "auto",
            }}
          >
            Health: {currentHealth}/{totalHealth}{" "}
            <MdOutlineWaterDrop style={{ margin: "auto 5" }} />
          </p>
          <div style={{ display: "flex", marginTop: 20 }}>
            <Button
              style={{ width: 100 }}
              onClick={() =>
                console.log("TODO: add functionality to this button!")
              }
            >
              Water
            </Button>
          </div>
          <p
            style={{
              display: "flex",
              margin: "auto",
            }}
          >
            {waterAvailable} <MdOutlineWaterDrop style={{ margin: "auto 5" }} />{" "}
            available
          </p>
          <p>{daysUntilWilted} days until wilted</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PlantStatus;
