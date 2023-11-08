import PropTypes from "prop-types";

import { getJSONData, updateJSONData } from "../../scripts/jsonData";
// import data from "../../data/users.json";



const Zoom = ({ courseID }) => {
  getJSONData("users.json").then(data => {
    console.log(data);

    data[0].name = "UPDATED NAME";
    updateJSONData("/users.json", data).then(console.log("writing to file..."));
  });
  // console.log(jsonObject);


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