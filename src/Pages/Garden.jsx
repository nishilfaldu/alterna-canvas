import image3 from "../assets/images/plant/garden3.png";
import image4 from "../assets/images/plant/garden4.png";
import image5 from "../assets/images/plant/garden5.png";
import tomatostage4 from "../assets/images/plant/tomato/stage4.png";



const Garden = () => {
  return (
    <>
      <h1>My Garden</h1>
      <hr></hr>
      <h4>Progress So Far</h4>
      <img src={image3} style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}></img>
      <h4>Current</h4>
      <img src={tomatostage4} style={{ width: "15%", marginLeft: "auto", marginRight: "auto" }}></img>
    </>
  );
};

export default Garden;
