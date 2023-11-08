import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";


// Create a context for the username
export const UserContext = createContext();

// Create a custom provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    // Check if there's a username stored in localStorage
    const storedUsername = localStorage.getItem("user");
    if (storedUsername) {
      setUser(storedUsername);
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