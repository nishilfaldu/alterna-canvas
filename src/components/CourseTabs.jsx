import { Tabs } from "antd";
import PropTypes from "prop-types";
import { useMemo } from "react";

import Assignments from "./tabContent/Assignments";
import Files from "./tabContent/Files";
import Grades from "./tabContent/Grades";
import Modules from "./tabContent/Modules";
import Syllabus from "./tabContent/Syllabus";
import Zoom from "./tabContent/Zoom";



function CourseTabs({ courseID, courseName }) {
  const tabItems = useMemo(
    () => [
      {
        label: "Syllabus",
        key: 1,
        children: <Syllabus courseID={courseID} />,
      },
      {
        label: "Modules",
        key: 2,
        children: <Modules courseID={courseID} />,
      },
      {
        label: "Grades",
        key: 3,
        children: <Grades courseID={courseID} />,
      },
      {
        label: "Assignments",
        key: 4,
        children: <Assignments courseID={courseID} />,
      },
      {
        label: "Files",
        key: 5,
        children: <Files courseID={courseID} />,
      },
      {
        label: "Zoom",
        key: 6,
        children: <Zoom courseName={courseName} />,
      },
    ],
    [courseID, courseName],
  );

  return (
    <section className="w-full">
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{
          marginBottom: 32,
        }}
        items={tabItems}
      />
    </section>
  );
}

CourseTabs.propTypes = {
  courseID: PropTypes.string,
  courseName: PropTypes.string,
};

export default CourseTabs;
