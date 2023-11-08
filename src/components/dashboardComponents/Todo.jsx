import { Card, Space } from "antd";

import ToDoComp from "../TodoComp";

const ToDo = () => {
  return (
    <Space direction="vertical" size={10}>
      <Card
        title="To-Do"
        extra={<a href="/todo">More</a>}
        style={{
          width: 275,
        }}
      >
        <ToDoComp></ToDoComp>
      </Card>{" "}
    </Space>
  );
};

export default ToDo;
