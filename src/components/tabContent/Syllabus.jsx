import PropTypes from "prop-types";
import { useEffect } from "react";

import { getFileContent } from "../../scripts/getS3Data";



const Syllabus = ({ courseID }) => {
  useEffect(() => {
    const fetchData = async () => {
      // Get the data from the file stored in S3
      const fileData = await getFileContent(`courses/${courseID}/course_info/syllabus.html`);

      const div = document.getElementById("syllabusHTML");

      // Show the syllabus' contents if it was found. Otherwise, notify the user.
      if (fileData) {
        // Parse the file as HTML content
      const doc = new DOMParser().parseFromString(fileData, "text/html");

      // Set the content of the div to be the syllabus' content
      div.innerHTML = doc.querySelector("body").innerHTML;
      } else {
        div.innerHTML = "<p>No syllabus was found for this course.</p>";
      }
    };

    fetchData();
  }, [courseID]);

  return (
      <div id="syllabusHTML"></div>
  );
};

Syllabus.propTypes = {
  courseID: PropTypes.string,
};

export default Syllabus;
