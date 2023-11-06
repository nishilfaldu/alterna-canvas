import { Card, Space } from "antd";



const ToDo = () => {
    return (
        <Space direction="vertical" size={16}>
            <Card
                title="To-Do"
                extra={<a href="/todo">More</a>}
                style={{
                    width: 380,
                }}
            >
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>

            </Card>
            {" "}
            {" "}
            {" "}

        </Space>

    );
};

export default ToDo; 