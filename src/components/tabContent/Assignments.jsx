import { FileOutlined } from "@ant-design/icons";
import { Collapse, List } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { listFiles } from "../../scripts/getS3Data";



const Assignments = ({ courseID }) => {
  const [assignments, setAssignments] = useState();
  useEffect(() => {
    async function fetchData() {
      let helperData = await listFiles(courseID, "assignments");
      setAssignments(helperData.folderToFileMap.get("assignments"));
    }

    fetchData();
  }, [courseID]);

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];


  const items = [
    {
      key: "1",
      label: "Assignments Submitted",
      children: <List
      itemLayout="horizontal"
      dataSource={assignments?.map(assignment => ({ title: assignment }))}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<FileOutlined style={{ fontSize: "25px", paddingTop: "10px" }} key={index}/>}
            title={<a href="https://ant.design">{item.title}</a>}
            description={`This is Assignment ${index + 1}`}
          />
        </List.Item>
      )}
    />,
    },
  ];

  return (
    <>
    <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="start"
        items={items}
      />
      <p>Assignments for course with id: {courseID}</p>
    </>
  );
};

Assignments.propTypes = {
  courseID: PropTypes.string,
};

export default Assignments;
