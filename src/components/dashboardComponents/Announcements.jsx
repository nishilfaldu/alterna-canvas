import { Card } from "antd";



const Announcements = () => {
  return (
    <Card
      title="Announcements"
      extra={<a href="/announcements">More</a>}
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

export default Announcements;
