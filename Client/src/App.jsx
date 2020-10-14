import React, { useEffect, useContext } from "react";
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
import { API, setAuthToken } from "./Config/api";
import PrivateRoute from "./Pages/PrivateRoute/Private";
import "./index.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");
      } catch (error) {}
    };
  }, []);

  return (
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
  );
}

export default App;
