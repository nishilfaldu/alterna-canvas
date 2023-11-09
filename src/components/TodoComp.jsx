import { Avatar, List, message } from "antd";
import { useEffect, useState } from "react";

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
        .map((course) => course.tabs.assignments.assignmentsNotSubmitted)
        .flat();

      // Take only three items
      const onlyThreeAssignments = assignmentsNotSubmitted.slice(2, 5);

      setAssignmentsMeta(onlyThreeAssignments);

      // setAssignmentsMeta(assignmentsNotSubmitted);
    }

    getUserData();
  }, [user]);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={assignmentsMeta}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={
                <a>
                  {item.class}: {item.name}
                </a>
              }
              description={item.dueDate}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default ToDoComp;
