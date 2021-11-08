import React, { useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import userActions from "../../redux/actions/user.action";
import "./CartPage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
    const history = useHistory();
    const handleClickProduct = (productId) => {
        history.push(`/product/${productId}`);
    }

    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loading);
    const products = useSelector(state => state.users.cartProduct);

    const handleOrder = () => {
        dispatch(userActions.postOrder());
        dispatch(userActions.getCurrentUser());
    }

    useEffect(() => {
        dispatch(userActions.getCartProduct());
    }, [dispatch]);
    return (
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <h1 className="text-center cart-title" style={{marginTop:"2rem", marginBottom: "3rem", color:"gray"}}>Your Cart</h1>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <div className="text-center">
                  <ClipLoader color="#f86c6b" size={150} loading={true} />
                </div>
              ) : (
                <ul className="list-unstyled d-flex flex-wrap justify-content-between" style={{display:"flex", flexDirection:"column", justifyContent:"center" }}>
                  {products && products.map((product) => (
                    <li key={product._id}>
                      <Card
                        style={{
                          borderRadius: "20px",
                          padding: "1rem",
                          marginBottom: "2rem",
                          position: "relative",
                          display: "flex",
                          flexDirection:"row",
                          alignContent: "space-around",
                          MozBoxShadow:"1px 1px lightgray"
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={product.productId.imageUrls[0]}
                          onClick={() => handleClickProduct(product.productId._id)}
                          style={{maxWidth:"200px"}}
                        />
                        <Card.Body style={{marginLeft:"100px"}}>
                          <Card.Title>Product: {product.productId.name}</Card.Title>
                          <Card.Text style={{color:"gray"}}>By: {product.productId.description}</Card.Text>
                          <Card.Text>Quantity: {product.quantity}</Card.Text>
                          <Button
                            className="position-absolute btn-secondary"
                            style={{ top: "10px", right: "10px" }}
                            size="sm"
                            // onClick={() => removeProduct(product._id)}
                          >
                            &times;
                          </Button>
                        </Card.Body>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
              <div style={{textAlign:"right", width:"60vw"}}>
                  Total Order Quantity: {products && products.length}
              </div>
              <div style={{textAlign:"right", width:"60vw", marginTop:"2rem"}}>
              <Button
                onClick={handleOrder} style={{backgroundColor:"lightsteelblue", border:"none", color:"black", marginBottom:'2rem'}}>Checkout</Button>
              <ToastContainer autoClose={2000} />
              </div>
            </Col>
          </Row>
        </Container>
      );
    };

export default CartPage;
