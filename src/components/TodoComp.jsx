import { Avatar, List } from "antd";
import { useEffect, useState } from "react";

import { useUser } from "./provider/useUser";
import users from "../data/users.json";

function ToDoComp() {
  const { user, setUser } = useUser();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user) {
      const match = users.find((u) => u.name === user);
      setUserInfo(match);
    }
  }, [user]);

  const handleChange = (value) => {
    localStorage.setItem("user", value);
    setUser(value);
  };

  const data = [
    {
      title: "{ userInfo.username}",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a>{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default ToDoComp;
