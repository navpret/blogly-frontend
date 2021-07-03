import React from "react";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Compose from "./pages/Compose";
import Blog from "./pages/Blog";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  .switch:nth-child(1) {
    background: pink;
  }
  .padding {
    padding: 0 3vw;
  }

  .main {
    flex-grow: 1;
    padding: 0 3vw;
  }
  ${
    "" /* footer{
    padding: 0 3vw;
  } */
  }
`;

const RouterComponent = () => {
  return (
      <Wrapper className="wrapper">
        <Header />
        <main className="main">
          <Switch className="switch">
            <Route exact path="/" component={Home} />
            <Route exact path="/read/:id" component={Blog} />
            <Route exact path="/new" component={Compose} />
            <Redirect from="*" to="/" />
          </Switch>
        </main>
        <Footer />
      </Wrapper>
  );
};

export default RouterComponent;
