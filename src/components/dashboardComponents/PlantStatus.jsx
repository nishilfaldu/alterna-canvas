import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import { MdOutlineWaterDrop } from "react-icons/md";



const PlantStatus = () => {
  // TODO: dynamically set these values
  const currentHealth = 2;
  const totalHealth = 15;
  const percentHealth = Math.round((currentHealth / totalHealth) * 100);
  const plantName = "Name of Plant";
  const waterAvailable = 4;
  const daysUntilWilted = 3;

  return (
    <Container>
      <Row>
        <Col>TODO: Add plant image here</Col>
        <Col lg={8}>
          <h2 style={{ marginBottom: 20 }}>{plantName}</h2>
          <ProgressBar
            now={percentHealth}
            label={`${percentHealth}%`}
            style={{ height: "38px" }}
          />
          <p
            style={{
              display: "flex",
            }}
          >
            Health: {currentHealth}/{totalHealth}{" "}
            <MdOutlineWaterDrop
              color="cornflowerblue"
              style={{ margin: "auto 5" }}
            />
          </p>
          <div style={{ marginTop: 20 }}>
            <Button
              style={{ width: "50%" }}
              onClick={() =>
                console.log("TODO: add functionality to this button!")
              }
            >
              Water
            </Button>
          </div>
          <p style={{ display: "flex" }}>
            {waterAvailable}{" "}
            <MdOutlineWaterDrop
              color="cornflowerblue"
              style={{ margin: "auto 5" }}
            />{" "}
            available, {daysUntilWilted} days until wilted
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PlantStatus;
