import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { getData } from "../../scripts/jsonHelpers";
import { useUser } from "../provider/useUser";



const Zoom = ({ courseName }) => {
  const { user } = useUser();
  const [gardenPic, setGardenPic] = useState();


  useEffect(() => {
    async function getUserData() {
      if (user) {
        const names = user.split(" ");
        const firstName = names[0];
        const lastName = names[1];
        const userData = await getData(
          `http://localhost:3030/students?name=${firstName}+${lastName}`,
        );

        setGardenPic(userData[0].currentGardenImage);
      }
    }

    getUserData();
  }, [user]);

  return (
    <>
      <h2>Join Zoom Meeting</h2>
      <p>Click the button below to join the scheduled zoom meeting for your {courseName} course.</p>
      <Button href="https://zoom.us/join">Join</Button>
      <img src={gardenPic} style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}></img>
    </>
  );
};

Zoom.propTypes = {
  courseName: PropTypes.string,
};

export default Zoom;
