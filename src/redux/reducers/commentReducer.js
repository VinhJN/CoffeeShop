import { createSlice } from "@reduxjs/toolkit";
import { addCommentAPI} from "../actions/commentAction";
//1. Khai báo khởi tạo, chữ initialState phải đúng chính tả. 
const initialState = {
    listComment: []
}
const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers:{
        addComment (state, action){
            state.listComment.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(addCommentAPI.fulfilled, (state, action) => {
          state.listComment.push(action.payload);
        });
      },
});
//Export các thành phàn dể sang screen sủ dụng
export const {addManage} = commentSlice.actions;
export default commentSlice.reducer;