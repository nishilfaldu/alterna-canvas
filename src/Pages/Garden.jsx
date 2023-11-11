import { message } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import { MdOutlineWaterDrop } from "react-icons/md";

import { useUser } from "../components/provider/useUser";
import { getData, putData } from "../scripts/jsonHelpers";



const Garden = () => {
  const { user } = useUser();
  const [thisUserWaterPoints, setThisUsersWaterPoints] = useState(null);
  const [daysToWilt, setDaysToWilt] = useState(null);
  const [numTimesWatered, setNumTimesWatered] = useState(null);
  const [currentPlantImage, setCurrentPlantImage] = useState(null);
  const [currentGardenImage, setCurrentGardenImage] = useState(null);
  const [currentPlantTitle, setCurrentPlantTitle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const names = user.split(" ");
          const firstName = names[0];
          const lastName = names[1];
          const allWaterData = await getData(
            `http://localhost:3030/students?name=${firstName}+${lastName}`,
          );

          const date = new Date(allWaterData[0].lastUpdatedWaterPoints);
          const today = new Date();
          const timeDifference = Math.abs(today - date);
          const daysDifference = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24),
          );

          setThisUsersWaterPoints(allWaterData[0].currentWaterPoints);
          setDaysToWilt(14 - daysDifference);
          setNumTimesWatered(allWaterData[0].numTimesWatered);
          setCurrentPlantImage(allWaterData[0].currentPlantImage);
          setCurrentGardenImage(allWaterData[0].currentGardenImage);
          setCurrentPlantTitle(allWaterData[0].currentPlantName);
        }
      } catch (error) {
        message.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleWatering = async () => {
    if (thisUserWaterPoints > 0) {
      const updatedWaterPoints = thisUserWaterPoints - 1;
      let updatedNumTimesWatered = numTimesWatered;
      let plantUpdate = currentPlantImage;
      let gardenUpdate = currentGardenImage;
      let plantTitle = currentPlantTitle;

      if (numTimesWatered < 5) {
        updatedNumTimesWatered += 1;
        if (currentPlantTitle === "Neem Tree") {
          plantUpdate = `src/assets/images/plant/tree/stage${updatedNumTimesWatered}.png`;
        } else if (currentPlantTitle === "Tomato Plant") {
          plantUpdate = `src/assets/images/plant/tomato/stage${updatedNumTimesWatered}.png`;
        }
      } else {
        updatedNumTimesWatered = 0;
        message.success("New level unlocked!");

        if (currentPlantTitle === "Neem Tree") {
          plantUpdate = "src/assets/images/empty.png";
          gardenUpdate = "src/assets/images/plant/garden5.png";
          plantTitle = "Done now";
        } else if (currentPlantTitle === "Tomato Plant") {
          plantUpdate = `src/assets/images/plant/tree/stage${updatedNumTimesWatered}.png`;
          gardenUpdate = "src/assets/images/plant/garden4.png";
          plantTitle = "Neem Tree";
        }
      }

      setThisUsersWaterPoints(updatedWaterPoints);
      setNumTimesWatered(updatedNumTimesWatered);
      setCurrentGardenImage(gardenUpdate);
      setCurrentPlantImage(plantUpdate);
      setCurrentPlantTitle(plantTitle);

      try {
        const names = user.split(" ");
        const firstName = names[0];
        const lastName = names[1];

        let data = await getData(
          `http://localhost:3030/students?name=${firstName}+${lastName}`,
        );
        data[0].currentWaterPoints = updatedWaterPoints;
        data[0].numTimesWatered = updatedNumTimesWatered;
        data[0].currentPlantImage = plantUpdate;
        data[0].currentGardenImage = gardenUpdate;
        data[0].currentPlantName = plantTitle;

        const updatedData = await putData(
          `http://localhost:3030/students/${data[0].id}/`,
          data[0],
        );

        if (updatedData) {
          message.success("Water point used!");
        } else {
          message.error("Error updating water points.");
        }
      } catch (error) {
        message.error("Error updating water points.");
      }
    } else {
      message.error(
        "Out of water points. Please refill by submitting more assignments!",
      );
    }
  };

  return (
    <div>
      <h1>My Garden</h1>
      <hr></hr>
      <br></br>
      {currentPlantTitle === "Done now" ? (
        <Container>
          <Row className="text-center">
            <Row>
              <img
                src={currentPlantImage}
                style={{ width: "10%", height: "auto", aspectRatio: "1 / 1" }}
                alt="Plant-Empty"
                className="mx-auto"
              />
              <p>All done for the semester!</p>
            </Row>
            <Row>
              <img
                src={currentGardenImage}
                alt="Garden"
                style={{
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  aspectRatio: "19 / 5",
                }}
              ></img>
            </Row>
          </Row>
        </Container>
      ) : (
          <Container>
            <Row>
              <Col>
                <img
                  src={currentPlantImage}
                  style={{ width: "50%", height: "auto", aspectRatio: "1 / 1" }}
                  alt="Plant"
                />
              </Col>
              <Col lg={8}>
                <h2 style={{ marginBottom: 20 }}> {currentPlantTitle} </h2>
                <ProgressBar
                  now={Math.round((numTimesWatered / 5) * 100)}
                  label={`${Math.round((numTimesWatered / 5) * 100)}%`}
                  style={{ height: "38px" }}
                />
                <p
                  style={{
                    display: "flex",
                  }}
                >
                  Health: {numTimesWatered}/{5}{" "}
                  <MdOutlineWaterDrop
                    color="cornflowerblue"
                    style={{ margin: "auto 5" }}
                  />
                </p>
                <div style={{ marginTop: 20 }}>
                  <Button
                    style={{ width: "50%" }}
                    onClick={handleWatering}
                  >
                    Water Me
                  </Button>
                </div>
                <p style={{ display: "flex" }}>
                  {thisUserWaterPoints}{" "}
                  <MdOutlineWaterDrop
                    color="cornflowerblue"
                    style={{ margin: "auto 5" }}
                  />{" "}
                  available, {daysToWilt} days until wilted
                </p>
              </Col>
            </Row>
            <Row>
              <div style={{ marginTop: "200px" }}>
                <img
                  src={currentGardenImage}
                  alt="Garden"
                  style={{
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    aspectRatio: "19 / 5",
                  }}
                ></img>
              </div>
            </Row>
          </Container>
        )}
    </div>
  );
};

Garden.propTypes = {
  courseID: PropTypes.string,
};
export default Garden;