import axios from 'axios'; 
import { allProductFail, allProductRequest, allProductSuccess } from '../reducers/productSlice';


export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async(dispatch) =>{
    try{
        dispatch({type : allProductRequest});
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
         }

        const { data } = await axios.get(link);


        dispatch({
            type : allProductSuccess,
            payload : data,
        })
    }catch(err){
        dispatch({type : allProductFail,
            payload : err.response.data.message,
        })  
    }
}

export const clearErrors = ()=> async(dispatch) =>{
    dispatch({type : clearErrors});
}