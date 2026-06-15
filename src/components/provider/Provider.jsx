import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { UserContext } from "./UserContext";


// Provides the current user's name to the app, hydrated from localStorage.
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    // Check if there's a username stored in localStorage
    const storedUsername = localStorage.getItem("user");
    if (storedUsername) {
      setUser(storedUsername);
    } else {
      setUser("Alice Johnson");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.array,
};
