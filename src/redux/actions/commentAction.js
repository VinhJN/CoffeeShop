import {createAsyncThunk} from '@reduxjs/toolkit';
import { addComment } from '../reducers/commentReducer';
import apiUrl from '../../../database/api';

const commentAPI = `${apiUrl}/comment`
export const fetchComments = () => {
  return async dispatch => {
    try {
      const response = await fetch(commentAPI);
      const data = await response.json();
      data.forEach(row => {
        dispatch(addComment(row));
      });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
};


export const addCommentAPI = createAsyncThunk(
  'comment/addCommentAPI',
  async (objAdd, thunkAPI) => {
    console.log(objAdd);
    try {
      const response = await fetch(commentAPI, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objAdd),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


