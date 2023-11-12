import { message } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import { MdOutlineWaterDrop } from "react-icons/md";

import { useUser } from "./provider/useUser";
import { getData, putData } from "../scripts/jsonHelpers";



const GardenComp = ({ isDashboard }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [daysToWilt, setDaysToWilt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const names = user.split(" ");
          const allUsersData = await getData(
            `http://localhost:3030/students?name=${names[0]}+${names[1]}`,
          );
          const thisUsersData = allUsersData[0];

          // Calculate the time to wilt
          const date = new Date(thisUsersData.lastUpdatedWaterPoints);
          const today = new Date();
          const timeDifference = Math.abs(today - date);
          const daysDifference = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );
          const calculatedDaysToWilt = 14 - daysDifference;

          // Update accordingly if the plant is wilted
          if (calculatedDaysToWilt <= 0) {
            // Tell the user that their plant has wilted
            message.warning(
              "Your plant has wilted and your progress for this plant has reset. Be sure to water your plant at least once every 2 weeks!",
              7,
            );

            const updatedPlantImage = `/plantImages/${
              thisUsersData.currentPlantName === "Apple Tree"
                ? "tree"
                : "tomato"
            }/stage${0}.jpg`;

            // Update the variable to be stored in the state
            thisUsersData.numTimesWatered = 0;
            thisUsersData.currentPlantImage = updatedPlantImage;

            // Update the variable in the JSON file
            try {
              const newUserData = {
                ...userData,
                numTimesWatered: 0,
                currentPlantImage: updatedPlantImage,
              };
              await putData(
                `http://localhost:3030/students/${userData.id}/`,
                newUserData,
              );
            } catch (error) {
              console.error("Error saving to JSON file: ", error);
            }
          }

          setDaysToWilt(calculatedDaysToWilt);
          setUserData(thisUsersData);
        }
      } catch (error) {
        message.error("Error fetching data: ", error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleWatering = async () => {
    if (userData) {
      const {
        currentWaterPoints,
        numTimesWatered,
        currentPlantImage,
        currentGardenImage,
        currentPlantName,
      } = userData;

      if (currentWaterPoints > 0) {
        const updatedWaterPoints = currentWaterPoints - 1;
        let updatedNumTimesWatered = numTimesWatered;
        let updatedPlantImage = currentPlantImage;
        let updatedGardenImage = currentGardenImage;
        let updatedPlantName = currentPlantName;

        if (numTimesWatered < 4) {
          updatedNumTimesWatered++;
          if (currentPlantName === "Apple Tree") {
            updatedPlantImage = `/plantImages/tree/stage${updatedNumTimesWatered}.jpg`;
          } else if (currentPlantName === "Tomato Plant") {
            updatedPlantImage = `/plantImages/tomato/stage${updatedNumTimesWatered}.jpg`;
          }
        } else {
          updatedNumTimesWatered = 0;
          if (currentPlantName === "Apple Tree") {
            message.success("Garden completed!");
            updatedPlantImage = "/plantImages/empty.png";
            updatedGardenImage = "/plantImages/garden5.png";
            updatedPlantName = "Done now";
          } else if (currentPlantName === "Tomato Plant") {
            message.success("New level unlocked!");
            updatedPlantImage = `/plantImages/tree/stage${updatedNumTimesWatered}.jpg`;
            updatedGardenImage = "/plantImages/garden4.png";
            updatedPlantName = "Apple Tree";
          }
        }

        const now = new Date();

        const newUserData = {
          ...userData,
          currentWaterPoints: updatedWaterPoints,
          lastUpdatedWaterPoints: `${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${now
            .getDate()
            .toString()
            .padStart(2, "0")}/${now.getFullYear().toString()}`,
          numTimesWatered: updatedNumTimesWatered,
          currentPlantImage: updatedPlantImage,
          currentGardenImage: updatedGardenImage,
          currentPlantName: updatedPlantName,
        };

        // Update the state of the page
        setUserData(newUserData);
        setDaysToWilt(14);

        // Update the JSON file
        try {
          const updatedData = await putData(
            `http://localhost:3030/students/${userData.id}/`,
            newUserData,
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
    }
  };

  return (
    <>
      <h1>My Garden</h1>
      <hr></hr>
      {userData && userData.currentPlantName === "Done now" && (
        <Container>
          <Row className="text-center">
            <Col>
              <Row style={{ marginBottom: 50 }}>
                <img
                  src={userData.currentPlantImage}
                  style={{
                    width: "15%",
                    height: "auto",
                    aspectRatio: "1 / 1",
                    marginBottom: 20,
                  }}
                  alt="Plant-Empty"
                  className="mx-auto"
                />
                <h2>All done for the semester!</h2>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
      {userData && userData.currentPlantName !== "Done now" && (
        <Container>
          <Row>
            <Col>
              <img
                src={userData.currentPlantImage}
                style={{
                  width: "50%",
                  height: "auto",
                  aspectRatio: "1 / 1",
                }}
                alt="Plant"
              />
            </Col>
            <Col lg={8}>
              <h2 style={{ marginBottom: 20 }}>
                {" "}
                {userData.currentPlantName}{" "}
              </h2>
              <ProgressBar
                now={Math.round((userData.numTimesWatered / 5) * 100)}
                label={`${Math.round((userData.numTimesWatered / 5) * 100)}%`}
                style={{ height: "38px" }}
              />
              <p
                style={{
                  display: "flex",
                }}
              >
                Health: {userData.numTimesWatered}/{5}{" "}
                <MdOutlineWaterDrop
                  color="cornflowerblue"
                  style={{ margin: "auto 5" }}
                />
              </p>
              <div style={{ marginTop: 20 }}>
                <Button style={{ width: "50%" }} onClick={handleWatering}>
                  Water Me
                </Button>
              </div>
              <p style={{ display: "flex" }}>
                {userData.currentWaterPoints}{" "}
                <MdOutlineWaterDrop
                  color="cornflowerblue"
                  style={{ margin: "auto 5" }}
                />{" "}
                available,{" "}
                {daysToWilt > 0 ? `${daysToWilt} days until wilted` : "wilted"}
              </p>
            </Col>
          </Row>
        </Container>
      )}
      {/* Only show the entire garden in the Garden page (not on the Dashboard) */}
      {!isDashboard && userData && (
        <div style={{ marginTop: "125px" }}>
          <img
            src={userData.currentGardenImage}
            alt="Garden"
            style={{
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              aspectRatio: "19 / 5",
            }}
          ></img>
        </div>
      )}
    </>
  );
};

GardenComp.propTypes = {
  isDashboard: PropTypes.bool,
};
export default GardenComp;
