import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
    initialState: {
        userAuth: null,
    },
    reducers: {
        isAuthenticated: (state, action) => {
            state.userAuth = action.payload;
        },
        //logout
        logout: (state) => {
            state.userAuth = null;
        },
    },
}) 

//Get the actions and reducer
export const {isAuthenticated, logout} = authSlice.actions; 
const authReducer = authSlice.reducer;
export default authReducer;