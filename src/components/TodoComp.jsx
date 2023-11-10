import { List, message } from "antd";
import { useEffect, useState } from "react";

import CourseIcons from "./CourseIcons";
import { useUser } from "./provider/useUser";
import { getData } from "../scripts/jsonHelpers";



function ToDoComp() {
  const { user } = useUser();
  const [assignmentsMeta, setAssignmentsMeta] = useState([]);

  useEffect(() => {
    async function getUserData() {
      if (!user) {
        message.error("User not found");

        return;
      }
      const names = user.split(" ");
      const firstName = names[0];
      const lastName = names[1];
      const userData = await getData(
        `http://localhost:3030/students?name=${firstName}+${lastName}`
      );

      const courses = userData[0].courses;

      const assignmentsNotSubmitted = courses
        .map(course => course.tabs.assignments.assignmentsNotSubmitted)
        .flat();

      // Sort the assignments in order of the due date
      assignmentsNotSubmitted.sort((a, b) =>
        a.dueDate > b.dueDate ? 1 : b.dueDate > a.dueDate ? -1 : 0,
      );

      // Get the 3 assignments with the earliest due dates
      const onlyThreeAssignments = assignmentsNotSubmitted.slice(0, 3);

      setAssignmentsMeta(onlyThreeAssignments);
    }

    getUserData();
  }, [user]);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={assignmentsMeta}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={CourseIcons[item.class]}
              title={<>{item.class}: {item.name}</>}
              description={item.dueDate}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default ToDoComp;
