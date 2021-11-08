import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../redux/actions/product.action";
import userActions from "../../redux/actions/user.action";
import "./DetailPage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailPage = () => {
    const [addingProductToCart, setAddingProductToCart] = useState(false);
    const [review, setReview] = useState("");
    const params = useParams();
    const productId = params.id;
    const rating = 5;

    const product = useSelector((state) => state.products.singleProduct);

    const loading = useSelector((state) => state.products.loading);

    const dispatch = useDispatch();
    
    const addToCart = (product) => {
        console.log(product)
        setAddingProductToCart(product?._id);
      };

    useEffect(() => {
    if (addingProductToCart) {
        dispatch(userActions.addToCart({addingProductToCart}))
    }
    }, [dispatch, addingProductToCart]);

    useEffect(() => {
        dispatch(productActions.getSingleProduct({productId}));
    }, [dispatch, productId]);
    const handleReviewInput = (e) => {
        e.preventDefault();
        setReview(e.target.value);
    }

    const handleReviewSubmit = () => {
        dispatch(userActions.postReview({ review, productId, rating }));
    };
    return (
        <Container>
            {loading ? (
                <div className="text-center">
                <ClipLoader color="#f86c6b" size={150} loading={true} />
                </div>
            ) : (
                <Row className="border mt-5"
                     style={{
                         paddingTop: "5rem",
                         paddingBottom: "5rem",
                         borderRadius: "20px", 
                         boxShadow:"1px 1px lightgray"
                     }}>
                <Col md={3}>
                    {product && (
                    <img
                        className="w-100"
                        src={product?.imageUrls[0]}
                        alt=""
                    />
                    )}
                </Col>
                <Col md={9} style={{
                }}>
                    {product && (
                    <>
                        <h2>{product?.name}</h2>
                        <p style={{color:"gray"}}>
                        {" "}
                            <em>{product?.description}</em>
                        </p>
                        <div>
                        <strong>Price: </strong>{product?.price.toLocaleString()} VND
                        </div>
                        <div>
                        <strong>In stock:</strong> {product?.stock}
                        </div>
                        <br />
                        <div>
                        <Button onClick={() => addToCart(product)} style={{backgroundColor:"lightsteelblue", border:"none", color:"black"}}>
                        Add to Cart
                        </Button>{" "}
                        </div>
                        <br />
                        <div>
                        <strong>Write us your review</strong>
                        <br />
                        <textarea key="review" rows="5" cols="50" onChange={handleReviewInput}></textarea>
                        </div>
                        <br />
                        <div>
                        <Button onClick={handleReviewSubmit} style={{backgroundColor:"lightsteelblue", border:"none", color:"black"}}>Send review</Button>
                        <ToastContainer autoClose={2000} />
                        </div>
                    </>
                    )}
                </Col>
                </Row>
            )}
        </Container>
    )
}

export default DetailPage;
 