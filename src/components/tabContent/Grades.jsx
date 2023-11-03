import PropTypes from "prop-types";



const Grades = ({ courseID }) => {
  return (
    <>
      <p>Grades for course with id: {courseID}</p>
    </>
  );
};

Grades.propTypes = {
  courseID: PropTypes.string,
};

export default Grades;