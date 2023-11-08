import { Card, Space } from "antd";

import AnnouncementsComp from "../AnnouncementsComp";

const Announcements = () => {
  return (
    <Space direction="vertical" size={16}>
      <Card
        title="Announcements"
        extra={<a href="/announcements">More</a>}
        style={{
          width: 275,
        }}
      >
        <AnnouncementsComp></AnnouncementsComp>
      </Card>
    </Space>
  );
};

export default Announcements;
