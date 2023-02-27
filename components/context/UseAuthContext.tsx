import { useContext } from "react";
import { AuthContext } from "./UserAuth";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
