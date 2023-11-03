import PropTypes from "prop-types";



const Syllabus = ({ courseID }) => {
  return (
    <>
      <p>Syllabus for course with id: {courseID}</p>
    </>
  );
};

Syllabus.propTypes = {
  courseID: PropTypes.string,
};

export default Syllabus;