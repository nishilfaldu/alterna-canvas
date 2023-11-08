import { Card } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import coursePicture from "../../assets/images/coursePic.jpg";



const { Meta } = Card;

const CustomCard = ({ title, link }) => {
    return ( //TODO: Switch out the Link to logic

        <Link to={link} style={{ textDecoration: "none" }}>
            <Card
                hoverable
                style={{
                    width: 250,
                    margin: "20px",
                    cursor: "pointer",
                }}
                cover={<img alt="example" src={coursePicture} />}
            >
                <Meta title={title} description="Fall Semester 2023" />
            </Card>
        </Link>
    );
};

CustomCard.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

const CourseCard = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row" }} className="card-container-dashboard">
            <CustomCard title="User Interface" link="/course/ui" />
            <CustomCard title="Computer Graphics" link="/course/computer_graphics" />
            <CustomCard title="Senior Design" link="/course/senior_design" />
            <span style={{ color: "white" }}>HelloHelloHelloHelloHello</span>
            {/* TODO: FIX THIS WITH FLEX  */}

        </div>
    );
};

export default CourseCard;
