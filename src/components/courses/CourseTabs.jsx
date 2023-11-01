import { Tabs } from "antd";
import { useMemo } from "react";



export function CourseTabs() {
  const tabItems = useMemo(() => [
    {
      label: "Tab 1",
      key: 1,
      children: "Content of tab 1",
    },
    {
      label: "Tab 2",
      key: 2,
      children: "Content of tab 2",
    },
    {
      label: "Tab 3",
      key: 3,
      children: "Content of tab 3",
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
          // width: 1000,
        }}
        items={tabItems}
      />
    </section>
  );
}

export default CourseTabs;