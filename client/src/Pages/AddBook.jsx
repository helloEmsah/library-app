import React from "react";
import AddBookForm from "../Components/AddBookForm";
import TopNav from "../Components/Home/TopNav";
import Sidebar from "../Components/Home/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

function AddBook() {
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
              <AddBookForm />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default AddBook;
