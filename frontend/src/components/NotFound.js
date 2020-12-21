import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      Not found!!!
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </Container>
  );
};

export default NotFound;
