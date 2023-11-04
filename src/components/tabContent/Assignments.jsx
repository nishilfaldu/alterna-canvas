import { FileOutlined } from "@ant-design/icons";
import { Collapse, List } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import users from "../../data/users.json";
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


  const assignmentsSubmitted = [
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

  const assignmentsNotSubmitted = [
    {
      key: "1",
      label: "Assignments Not Submitted",
      children: <List
      itemLayout="horizontal"
      dataSource={users[0].assignmentsNotSubmitted?.map(assignment => ({ title: assignment.name }))}
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
    <div className="flex flex-col gap-y-4">
      <p>Assignments for course with id: {courseID}</p>

    <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="start"
        items={assignmentsNotSubmitted}
      />

      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="start"
        items={assignmentsSubmitted}
      />
    </div>

    
  );
};

Assignments.propTypes = {
  courseID: PropTypes.string,
};

export default Assignments;
