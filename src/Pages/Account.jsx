import { Select } from "antd";

import { useUser } from "../components/provider/useUser";



export default function Account() {
  const { user, setUser } = useUser();

  const handleChange = value => {
    localStorage.setItem("user", value);
    setUser(value);
  };
  
  return <h1>
      Profile
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
    </h1>;
}

