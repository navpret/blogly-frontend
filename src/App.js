import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ToastProvider } from "react-toast-notifications";

import DataProvider from "./GlobalState";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <DataProvider>
          <GlobalStyles>
            <Router />
          </GlobalStyles>
        </DataProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
