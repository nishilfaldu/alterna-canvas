import { Card } from "antd";



const ToDo = () => {
  return (
    <Card
      title="To-Do"
      extra={<a href="/todo">More</a>}
      style={{
        width: "auto",
        marginTop: 20,
      }}
    >
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </Card>
  );
};

export default ToDo;
