import { Select } from "antd";
import { useEffect, useState } from "react";

import { useUser } from "../components/provider/useUser";
import users from "../data/users.json";



export default function Account() {
  const { user, setUser } = useUser();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user) {
      const match = users.find(u => u.name === user);
      setUserInfo(match);
    }
  }, [user]);

  const handleChange = value => {
    localStorage.setItem("user", value);
    setUser(value);
  };

  return (
    <>
      <h1>
        Profile
      </h1>
      <div className="flex items-center gap-x-40">
        <div>
          <img
            style={{
              width: 300,
              height: 300,
              top: 30,
              left: 50,
              position: "relative",
            }}
            src="https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/S1Yc7F14OY0nt2uB50.png?Expires=1698214046&Signature=fix6SRlz-nAX7wBqXnllf8e3caUuMCKFkTo5kEVp0XJlY~cAXzG4N9UB3cuFNmiQmelDDKCdonPGovRV7zTP-p7pqk9Q327kpO09CRs-LUNtyCF-l02yv~D5u-N7eF0ONKneNInShJyKghKTtk9Q8KYXsReIJTPl782Ab0NhX33z4w9wRhuSQsxEocqwqBu9W6bT75vwvjXuyopQTNtuT9TsUvU454dMheNsWFVMLFgzsTEM8TbizkO7rXorEaUFF3MSEDXNB7CFM01N85FUZMRe7Lc2~EF0LRw1RkFGEuJDYkmKQuwxMFQiRFEXy67CTrPpBISxPtJorwRTLXsVlQ__&Key-Pair-Id=K2YEDJLVZ3XRI"
            alt="Profile"
          />
        </div>
       <div className="flex flex-col gap-y-3">
        <Select
            size="large"
            value={user}
            onChange={handleChange}
            options={[
              { value: "Alice Johnson", label: "Alice Johnson" },
              { value: "Bob Anderson", label: "Bob Anderson" },
              { value: "Eva Martinez", label: "Eva Martinez" },
            ]}
            style={{ width: 200 }}
          />
          <h3>Name: {user}</h3>
          <h3>Email: {userInfo?.email}</h3>
          <h3>Username: {userInfo?.username}</h3>
       </div>
      </div>
    </>
  );
}
