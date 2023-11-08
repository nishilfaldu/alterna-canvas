// src/components/Announcements.js
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Collapse, Select } from "antd";
import { useState } from "react";

const { Option } = Select;
const genExtra = () => (
  <ExclamationCircleFilled
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);
const announcementsData = [
  {
    key: 1,
    label: "User Interface: No in-person class this week",
    class: "Class A",
    date: "2023-01-10",
    children: (
      <div>
        <p>
          The asynchronous activity has been posted. I believe on Wednesday that
          time difference led to some problems with the assignment availability.
          Melbourne is a day ahead. Let me know if there are any issues.{" "}
        </p>
        <p style={{ color: "#999999" }}>- Dr. Jillian Aurisano</p>
        <p style={{ color: "#999999" }}>Posted on 2023-10-13 at 10:17am</p>
      </div>
    ),
    extra: genExtra(),
  },
  {
    key: 2,
    label: "Computer Graphics: Assignment 3 report due before 11:59pm, Friday",
    class: "Class B",
    date: "2023-10-08",
    children: (
      <div>
        <p>
          Please remember to submit your Assignment 3 report by 11:59pm, Friday,
          October 27, 2023.
        </p>
        <p style={{ color: "#999999" }}>- John G.</p>
        <p style={{ color: "#999999" }}>Posted on 2023-10-08 at 10:17am</p>
      </div>
    ),
  },
  {
    key: 3,
    label: "Senior Design: Fall Report Due",
    class: "Class A",
    date: "2023-10-02",
    children: (
      <div>
        <p>
          There are two final assignments for the course. Final Fall Design
          Reports are due on Nov 26. The contents of your final report will come
          from the revisions of all your assignments. We expect that assignments
          will be updated since your original submission. Included in your
          report should be a Table of Contents, and your report should include a
          README.md page that lists a Table of Contents for all sections of your
          Fall Design Reports.
        </p>
        <p style={{ color: "#999999" }}>- Fred Annexstein</p>
        <p style={{ color: "#999999" }}>Posted on 2023-10-02 at 8:42am</p>
      </div>
    ),
  },
];

const Announcements = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  return (
    <>
      <h2>Announcements</h2>
      <hr style={{ width: "100%" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      />
      <br></br>
      <Collapse
        defaultActiveKey={["1"]}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
        items={announcementsData}
      ></Collapse>

      <br />
      <span>Expand Icon Position: </span>
      <Select
        value={expandIconPosition}
        style={{
          margin: "8px",
        }}
        onChange={onPositionChange}
      >
        <Option value="start">Start</Option>
        <Option value="end">End</Option>
      </Select>
    </>
  );
};

export default Announcements;
