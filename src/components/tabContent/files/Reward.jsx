import { Result } from "antd";
import { MdOutlineWaterDrop } from "react-icons/md";



export function Reward() {
    return(
        <Result
            icon={<MdOutlineWaterDrop color="cornflowerblue" size={150} style={{ margin: "auto" }}/>}
            title="Great job! Here's a water point as a reward!"
            // extra={<Button type="primary" style={{ backgroundColor: "blue" }}>Close</Button>}
        />
    );
}
  
export default Reward;