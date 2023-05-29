import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
//import products from '../products'
// import axios from 'axios'

export default function ProductScreen({ history, match }) {
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`);
  };

  // const [product, setProduct] = useState([])

  // useEffect(() => {
  //     const fetchProducts = async () => {
  //         const { data } = await axios.get(`/api/products/${match.params.id}`)

  //         setProduct(data)
  //     }
  //     fetchProducts()
  // }, [])

  // const { data } = await axios.post(`/api/cart/add`, order);

  // dispatch({
  //   type: ORDER_CREATE_SUCCESS,
  //   payload: data,
  // });
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.img} alt={product.title} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.title}</h3>
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.about}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
