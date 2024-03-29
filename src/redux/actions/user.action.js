import api from "../../apiService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as types from "../constants/user.constant";

const userActions = {};

userActions.getCurrentUser = () => async (dispatch) => {
    try {
        dispatch({type: types.GET_SINGLE_USER_REQUEST});
        const res = await api.get("/users/me");
        // console.log("res is", res)
        dispatch({type: types.GET_SINGLE_USER_SUCCESS, payload: res.data});
    } catch (err) {
        console.log(err);
        dispatch({type: types.GET_SINGLE_USER_FAIL});
    }
}

userActions.addToCart = ({addingProductToCart}) => {
    return async (dispatch) => {
        dispatch({type: types.ADD_TO_CART_REQUEST});
        try {
            let url = `/users/cart`;
            let res = await api.post(url, {
                "productId": addingProductToCart,
                "quantity": 1
            });
            dispatch({type: types.ADD_TO_CART_SUCCESS, payload: res.data});
            toast.success("Item has successfully been added to your cart");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.ADD_TO_CART_FAIL, payload: err.message});
        }
    }
}

userActions.getCartProduct = () => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_TO_CART_REQUEST});
            const res = await api.get(`/users/me`);
            dispatch({type: types.GET_TO_CART_SUCCESS, payload: res.data});
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.GET_TO_CART_FAIL});
        }
    }
}

userActions.postReview = ({ productId, review, rating}) => {
    return async (dispatch) => {
        dispatch({type: types.POST_REVIEW_REQUEST});
        try {
            const res = await api.post(`/reviews`, {
                "productId": [productId],
                "content": review,
                "rating": rating,
          });
            dispatch({type: types.POST_REVIEW_SUCCESS});
            toast.success("Your review has been received");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.POST_REVIEW_FAIL});
        }
    }
}

userActions.postOrder = () => {
    return async (dispatch) => {
        dispatch({type: types.POST_ORDER_REQUEST});
        try {
            const res = await api.post(`/orders`);
            dispatch({type: types.POST_REVIEW_SUCCESS});
            toast.success("We've received your order. Thanks for shopping with us!");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.POST_REVIEW_FAIL});
        }
    }
}

export default userActions;
