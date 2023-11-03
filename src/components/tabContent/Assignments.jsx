import PropTypes from "prop-types";



const Assignments = ({ courseID }) => {
  return (
    <>
      <p>Assignments for course with id: {courseID}</p>
    </>
  );
};

Assignments.propTypes = {
  courseID: PropTypes.string,
};

export default Assignments;
