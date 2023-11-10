import { useParams } from "react-router-dom";

import CourseTabs from "../components/CourseTabs";



function Course() {
  // Get the course from the URL parameter
  const { id } = useParams();
  let courseName = "";
  if (id === "ui") {
    courseName = "User Interface Design";
  } else if (id === "computer_graphics") {
    courseName = "Computer Graphics";
  } else if (id === "senior_design") {
    courseName = "Senior Design";
  } else {
    // Redirect to the Dashboard if the course is invalid
    window.location.replace("/");
  }

  return (
    <>
      <h1>{courseName}</h1>
      <CourseTabs courseID={id} courseName={courseName} />
    </>
  );
}

export default Course;
