import { useContext } from "react";
import AuthContext from "./AuthContext";




const useAuth = () => {

  const context = useContext(AuthContext);
  console.log("context : " , context);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;