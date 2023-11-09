/* eslint-disable max-len */
import { FileOutlined } from "@ant-design/icons";
import { Collapse, List, Modal } from "antd";
import { message } from "antd";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import Reward from "./files/Reward";
import UploadFile from "./files/UploadFile";
import { listFiles } from "../../scripts/getS3Data";
import { getData, putData } from "../../scripts/jsonHelpers";
import { useUser } from "../provider/useUser";

const Assignments = ({ courseID }) => {
  const [modal, contextHolder] = Modal.useModal();
  const { user } = useUser();
  const [_assignmentsNotSubmitted, setAssignmentsNotSubmitted] = useState([]);
  const [_assignmentsSubmitted, setAssignmentsSubmitted] = useState([]);

  const [assignments, setAssignments] = useState();
  useEffect(() => {
    async function fetchData() {
      let helperData = await listFiles(courseID, "assignments");
      setAssignments(helperData.folderToFileMap.get("assignments"));
    }

    fetchData();
  }, [courseID]);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        message.error("User not found");

        return;
      }
      const names = user.split(" ");
      const firstName = names[0];
      const lastName = names[1];
      // here data is an array of an object
      const data = await getData(
        `http://localhost:3030/students?name=${firstName}+${lastName}`
      );
      const course = data[0]?.courses.filter(
        (course) => course.key === courseID
      );
      const assignNotSubmitted =
        course[0].tabs.assignments.assignmentsNotSubmitted;
      setAssignmentsNotSubmitted(assignNotSubmitted);
      const assignSubmitted = course[0].tabs.assignments.assignmentsSubmitted;
      // console.log(assignSubmitted);
      setAssignmentsSubmitted(assignSubmitted);
    }

    fetchData();
  }, [user, courseID]);

  const assignmentsSubmitted = [
    {
      key: "1",
      label: "Assignments Submitted",

      children: (
        <List
          itemLayout="horizontal"
          // eslint-disable-next-line max-len
          dataSource={[
            ...(assignments || []).map((assignment) => ({ title: assignment })),
            ..._assignmentsSubmitted.map((assignment) => ({
              title: assignment.name,
            })),
          ]}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <FileOutlined
                    style={{ fontSize: "25px", paddingTop: "10px" }}
                    key={index}
                  />
                }
                title={<a>{item.title}</a>}
                description={`This is Assignment ${index + 1}`}
              />
            </List.Item>
          )}
        />
      ),
    },
  ];

  const openRewardModal = useCallback(() => {
    const { destroy, update } = modal.info();
    update({
      title: "Reward",
      content: <Reward />,
      closable: false,
      okText: "Accept",
      okButtonProps: { style: { backgroundColor: "blue" } },
      onCancel: destroy,
      okCancel: false,
      onOk: async () => {
        const names = user.split(" ");
        const firstName = names[0];
        const lastName = names[1];


        let data = await getData(
          `http://localhost:3030/students?name=${firstName}+${lastName}`
        );
        data[0].currentWaterPoints = data[0].currentWaterPoints + 1;
        const updatedData = putData(
          `http://localhost:3030/students/${data[0].id}/`,
          data[0]
        );

        if (updatedData) {
          message.success("Water point accepted!");
        } else {
          message.error("There was an error in accepting a water point");
        }
      },
    });
  }, [modal, user]);

  const openSubmissionModal = useCallback(
    (title, description) => {
      const { destroy, update } = modal.info();
      update({
        title: title,
        content: (
          <>
            <p>{description}</p>
            <UploadFile
              courseID={courseID}
              folderType="assignments"
              fileName={title}
            />
          </>
        ),
        closable: true,
        cancelText: "Cancel",
        icon: null,
        okButtonProps: { style: { backgroundColor: "blue" } },
        okCancel: true,
        okText: "OK",
        onCancel: destroy,
        onOk: async () => {
          const names = user.split(" ");
          const firstName = names[0];
          const lastName = names[1];

          let data = await getData(
            `http://localhost:3030/students?name=${firstName}+${lastName}`
          );
          let assignmentsLeft = _assignmentsNotSubmitted.filter(
            (assignment) => assignment.name !== title
          );
          data[0].courses.filter(
            (course) => course.key === courseID
          )[0].tabs.assignments.assignmentsNotSubmitted = assignmentsLeft;
          data[0].courses.filter(
            (course) => course.key === courseID
          )[0].tabs.assignments.assignmentsSubmitted = [
            ..._assignmentsSubmitted,
            ..._assignmentsNotSubmitted.filter(
              (assignment) => assignment.name === title
            ),
          ];
          console.log(data, "data");
          const updatedData = putData(
            `http://localhost:3030/students/${data[0].id}/`,
            data[0]
          );
          if (updatedData) {
            message.success("Assignment Submitted Successfully");
          } else {
            message.error("Error in submitting the assignment");
          }
          openRewardModal();
        },
      });
    },
    [
      modal,
      courseID,
      openRewardModal,
      user,
      _assignmentsNotSubmitted,
      _assignmentsSubmitted,
    ]
  );


  const assignmentsNotSubmitted = [
    {
      key: "1",
      label: "Assignments Not Submitted",

      children: (
        <List
          itemLayout="horizontal"
          dataSource={_assignmentsNotSubmitted.map((assignment) => ({
            title: assignment.name,
            description: assignment.description,
          }))}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <FileOutlined
                    style={{ fontSize: "25px", paddingTop: "10px" }}
                    key={index}
                  />
                }
                title={
                  <a
                    onClick={() =>
                      openSubmissionModal(item.title, item.description)
                    }
                  >
                    {item.title}
                  </a>
                }
                description={`This is Assignment ${index + 1}`}
              />
            </List.Item>
          )}
        />
      ),

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
      {contextHolder}
    </div>

  );
};

Assignments.propTypes = {
  courseID: PropTypes.string,
};

export default Assignments;
