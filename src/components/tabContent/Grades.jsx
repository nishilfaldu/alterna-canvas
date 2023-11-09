import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";

import usersData from "../../data/users.json";
import { useUser } from "../provider/useUser";

const Grades = ({ courseID }) => {
  const { user, setUser } = useUser();
  const [thisUsersGrades, setThisUsersGrades] = useState(null);

  useEffect(() => {
    if (user) {
      setThisUsersGrades(
        usersData
          .find((currentUserInArray) => currentUserInArray.name === user)
          .courses.find((course) => course.key === courseID).tabs.gradesObtained
      );
    }
  }, [user, courseID, thisUsersGrades]);

  return (
    <>
    <h2>Total Grade: CALCULATE AND ADD HERE</h2>
    <h2>Grade by Section</h2>
    Show grade breakdown here...
    <h2>Details</h2>
      {user && thisUsersGrades && (
        <>
          {Object.keys(thisUsersGrades)
            .filter((gradeTypeName) => !gradeTypeName.includes("Weightage"))
            .map((gradeType, headerIndex) => {
              return (
                <div key={`header${headerIndex}`}>
                  <h3>
                    {gradeType.charAt(0).toUpperCase() + gradeType.slice(1)}
                  </h3>
                  <ListGroup>
                    {thisUsersGrades[gradeType].map((type, typeIndex) => {
                      return (
                        <ListGroup.Item key={`type${typeIndex}`}>
                          <Container>
                            <Row>
                              <Col>
                                <h4>{type.title}</h4>
                                <p>Start Date: {type.startDate}</p>
                                <p>Due Date: {type.dueDate}</p>
                              </Col>
                              <Col
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                }}
                              >
                                <p>
                                  <b>Grade:</b> {type.pointsObtained}/
                                  {type.totalPoints} (
                                  {Math.round(
                                    (type.pointsObtained / type.totalPoints) *
                                      100
                                  )}
                                  %)
                                </p>
                              </Col>
                            </Row>
                          </Container>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </div>
              );
            })}
        </>
      )}
      {!user && <p>You are not currently logged in.</p>}
      {user && !thisUsersGrades && (
        <p>Sorry, no grades were found for you, {user}.</p>
      )}
    </>
  );
};

Grades.propTypes = {
  courseID: PropTypes.string,
};

export default Grades;
