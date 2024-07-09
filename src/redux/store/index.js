import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../reducers/commentReducer";


export default configureStore({
    reducer: {
        listComment: commentReducer,
    }
}); 