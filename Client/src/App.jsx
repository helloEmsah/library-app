import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import Sidebar from "./Components/Home/Sidebar";
import MyLibrary from "./Pages/MyLibrary";
import Profile from "./Pages/Profile";
import DetailBook from "./Pages/DetailBook";
import ReadBook from "./Pages/ReadBook";
import AddBook from "./Pages/AddBook";
import TopNav from "./Components/Home/TopNav";
import AdminPages from "./Pages/AdminPages";

import "./index.css";

import LoginContextProvider from "./Context/LoginContext";
import PrivateRoute from "./Pages/PrivateRoute/Private";

function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/admin" component={AdminPages} />
          <PrivateRoute exact path="/readbook/:id" component={ReadBook} />

          <Container fluid>
            <TopNav />
            <Row>
              <Col lg={2}>
                <Sidebar />
              </Col>
              <Col lg={10}>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/mylibrary" component={MyLibrary} />
                <PrivateRoute exact path="/addbook" component={AddBook} />
                <PrivateRoute
                  exact
                  path="/detailbook/:id"
                  component={DetailBook}
                />
              </Col>
            </Row>
          </Container>
        </Switch>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
