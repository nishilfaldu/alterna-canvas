import { Select, Typography } from "antd";
import { useEffect, useState, useMemo } from "react";

import { useUser } from "../components/provider/useUser";
import users from "../data/users.json";



const { Paragraph } = Typography;

export default function Account() {
  const { user, setUser } = useUser();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user) {
      const match = users.students.find(u => u.name === user);
      setUserInfo(match);
    }
  }, [user]);

  const handleChange = value => {
    localStorage.setItem("user", value);
    setUser(value);
  };

  const [editableStrWithSuffix, setEditableStrWithSuffix] = useState(
    "Write a few lines about yourself.",
  );

  const [editableStrWithSuffixStartPart, editableStrWithSuffixSuffixPart] =
    useMemo(
      () => [
        editableStrWithSuffix.slice(0, -12),
        editableStrWithSuffix.slice(-12),
      ],
      [editableStrWithSuffix],
    );

  return (
    <>
      <h2>Profile</h2>
      <hr style={{ width: "80%" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      ></div>
      <div className="flex items-center gap-x-20">
        <img style={{ borderRadius: "50%", margin: 50 }} src={`src/assets/profileImages/${user.split(" ")[0].toLowerCase()}.jpg`} />
        <div className="flex flex-col gap-y-3">
          <Select
            size="medium"
            value={user}
            onChange={handleChange}
            options={[
              { value: "Alice Johnson", label: "Alice Johnson" },
              { value: "Bob Anderson", label: "Bob Anderson" },
              { value: "Eva Martinez", label: "Eva Martinez" },
            ]}
            style={{ width: 200 }}
          />
          <br></br>
          <h4 style={{ color: "black" }}>{user}</h4>
          <h6 style={{ color: "blue", textDecoration: "underline" }}>
            {userInfo?.email}
          </h6>
          <h6>Username: {userInfo?.username}</h6>
          <Paragraph
            editable={{
              onChange: setEditableStrWithSuffix,
              text: editableStrWithSuffix,
            }}
            ellipsis={{
              suffix: editableStrWithSuffixSuffixPart,
            }}
          >
            {editableStrWithSuffixStartPart}
          </Paragraph>
        </div>
      </div>
    </>
  );
}
