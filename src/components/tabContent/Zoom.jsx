import PropTypes from "prop-types";



const Zoom = ({ courseID }) => {
  return (
    <>
      <p>Zoom for course with id: {courseID}</p>
    </>
  );
};

Zoom.propTypes = {
  courseID: PropTypes.string,
};

export default Zoom;