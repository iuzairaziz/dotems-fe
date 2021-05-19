import React from "react";
import userService from "../../../services/UserService";
import { useHistory } from "react-router-dom";

const Auth = ({ children }) => {
  const history = useHistory();
  return (
    <div>
      {userService.isLoggedIn() ? (
        children
      ) : (
        <>
          {history.push("/login")}
          {window.location.reload()}
        </>
      )}

      {console.log("Condition Test", userService.isLoggedIn())}
    </div>
  );
};

export default Auth;
