import { useContext } from "react";

import { UserContext } from "./UserContext";


// Custom hook to access the username context
export const useUser = () => {
  return useContext(UserContext);
};
