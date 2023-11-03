import PropTypes from "prop-types";



const Modules = ({ courseID }) => {
  return (
    <>
      <p>Modules for course with id: {courseID}</p>
    </>
  );
};

Modules.propTypes = {
  courseID: PropTypes.string,
};

export default Modules;