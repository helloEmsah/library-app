import React from "react";
import Content from "../Components/Home/Content";
import TopNav from "../Components/Home/TopNav";
import Sidebar from "../Components/Home/Sidebar";
import { Col, Row, Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <Container fluid>
        <TopNav />
        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <Content />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
