import React from "react";
import AddBookFormAdmin from "../Components/AddBookFormAdmin";
import TopNav from "../Components/Home/TopNav";
import Sidebar from "../Components/Home/Sidebar";
import { Row, Col, Container } from "react-bootstrap";

function AddBookAdmin() {
  return (
    <>
      <Container fluid>
        <TopNav />

        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <div id="add-book">
              <AddBookFormAdmin />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default AddBookAdmin;
