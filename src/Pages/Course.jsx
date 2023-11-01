import { useParams } from "react-router-dom";

import CourseTabs from "../components/courses/CourseTabs";



function Course() {
  // Get the course from the URL parameter
  const { id } = useParams();
  let courseName = "";
  if (id === "UI") {
    courseName = "User Interface Design";
  } else if (id === "graphics") {
    courseName = "Computer Graphics";
  } else if (id === "seniorDesign") {
    courseName = "Senior Design";
  } else {
    // Redirect to the Dashboard if the course is invalid
    window.location.replace("/");
  }

  return (
    <>
      <h1>{courseName}</h1>
      <CourseTabs />
    </>
  );
}

export default Course;
