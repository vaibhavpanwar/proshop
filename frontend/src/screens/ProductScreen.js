import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>Price : ₹ {product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong> ₹ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <a
                      className="btn btn-primary my-3"
                      href={product.amazonLink}
                      target="_blank"
                    >
                      Buy From Amazon
                    </a>
                    <br />
                    <a
                      className="btn btn-primary my-3"
                      href={product.flipkartLink}
                      target="_blank"
                    >
                      Buy From Flipkart
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
