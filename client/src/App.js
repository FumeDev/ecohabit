import React from "react";
import Routes from "./components/Routes";
import { RegisterContextProvider } from "./contexts/RegisterContext";
import { UserContextProvider } from "./contexts/UserContext";

/**
 *To avoid bloated App.js component, page routes created at Routes.js component.
 */

function App() {
  return (
    <>
      <RegisterContextProvider>
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      </RegisterContextProvider>
    </>
  );
}

export default App;
