import { Tabs } from "antd";
import { useMemo } from "react";



export function CourseTabs() {
  const tabItems = useMemo(() => [
    {
      label: "Syllabus",
      key: 1,
      children: <div>Syllabus</div>,
    },
    {
      label: "Modules",
      key: 2,
      children: <div>Modules</div>,
    },
    {
      label: "Grades",
      key: 3,
      children: <div>Grades</div>,
    },
    {
      label: "Assignments",
      key: 4,
      children: <div>Assignments</div>,
    },
    {
      label: "Files",
      key: 5,
      children: <div>Files</div>,
    },
    {
      label: "Grades",
      key: 6,
      children: <div>Grades</div>,
    },
    {
      label: "Zoom",
      key: 7,
      children: <div>Zoom</div>,
    },
  ], []);

  return (
    <section className="w-full">
      <Tabs
        defaultActiveKey="1"
        size="large"
        centered
        style={{
          marginBottom: 32,
        }}
        items={tabItems}
      />      
    </section>
  );
}

export default CourseTabs;