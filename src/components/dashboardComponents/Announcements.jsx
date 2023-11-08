import { Card, Space } from "antd";



const Announcements = () => {
    return (
        <Space direction="vertical" size={16}>
            <Card
                title="Announcements"
                extra={<a href="/announcements">More</a>}
                style={{
                    width: 400,
                }}
            >
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </Card>
        </Space>

    );
};

export default Announcements; 