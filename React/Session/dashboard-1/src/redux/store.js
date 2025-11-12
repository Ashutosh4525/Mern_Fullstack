import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counter.slice";
import  productReducer  from "./slice/product.slice";

const store=configureStore({
    reducer:{
        counter:counterReducer,
        product:productReducer,
    }
});

export default store;