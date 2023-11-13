import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { getFileContent } from "../../scripts/getS3Data";
import { getData } from "../../scripts/jsonHelpers";
import { useUser } from "../provider/useUser";



const Syllabus = ({ courseID }) => {
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

  return (<>
    <div id="syllabusHTML"></div>
    <img src={gardenPic} style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}></img>
  </>
  );
};

Syllabus.propTypes = {
  courseID: PropTypes.string,
};

export default Syllabus;
