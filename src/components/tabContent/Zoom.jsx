import PropTypes from "prop-types";
import { Button } from "react-bootstrap";



const Zoom = ({ courseName }) => {
  return (
    <>
    <h2>Join Zoom Meeting</h2>
    <p>Click the button below to join the scheduled zoom meeting for your {courseName} course.</p>
      <Button href="https://zoom.us/join">Join</Button>
    </>
  );
};

Zoom.propTypes = {
  courseName: PropTypes.string,
};

export default Zoom;
