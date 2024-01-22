import React from "react";
import Routes from "./components/Routes";
import { RegisterContextProvider } from "./contexts/RegisterContext";
import { UserContextProvider } from "./contexts/UserContext";
import { LoginContextProvider } from "./contexts/LoginContext";

/**
 *To avoid bloated App.js component, page routes created at Routes.js component.
 */

function App() {
  return (
    <>
      <RegisterContextProvider>
        <UserContextProvider>
          <LoginContextProvider>
            <Routes />
          </LoginContextProvider>
        </UserContextProvider>
      </RegisterContextProvider>
    </>
  );
}

export default App;
