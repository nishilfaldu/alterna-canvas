import { Link } from "react-router-dom";



function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      {/* I added these Link elements to make it easier to navigate during development. Remove them when developing the Dashboard. -- Emma */}
      <p>
        <Link to="/course/ui">User Interface</Link>
      </p>
      <p>
        <Link to="/course/computer_graphics">Computer Graphics</Link>
      </p>
      <p>
        <Link to="/course/senior_design">Senior Design</Link>
      </p>
    </>
  );
}

export default Dashboard;
