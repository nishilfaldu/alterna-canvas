import { BgColorsOutlined } from "@ant-design/icons";
import { Result } from "antd";



export function Reward() {
    return(
        <Result
            icon={<BgColorsOutlined />}
            title="Great job! Here's a water point as a reward!"
            // extra={<Button type="primary" style={{ backgroundColor: "blue" }}>Close</Button>}
        />
    );
}
  
export default Reward;