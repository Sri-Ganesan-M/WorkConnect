import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoggedIn: false,
    user: {},
};
// yet to configure waiting for frontend to be available
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("setting user to", action.payload);
            return {
                ...state,
                user: action.payload,
            }
        },
        setIsLoggedIn: (state, action) => {
            console.log("setting isLoggedIn to", action.payload);
            return {
                ...state,
                isLoggedIn: action.payload
            }
        }
    },
});

export const { setUser, setIsLoggedIn } = userSlice.actions;

export const signUpUser = (userData) => {
    console.log("RTK: We started sign up ")
    return async (dispatch) => {
        try {
            console.log("RTK: Making sign up request to server")
            await axios.post("/api/signup", userData);
            dispatch(setIsLoggedIn(false));
        } catch (error) {
            console.error(error);
        }
        console.log("RTK: We finished signup");
    };
};

export const loginUser = (userData) => {
    console.log("RTK: We started log in ")
    return async (dispatch) => {
        try {
            console.log("RTK: Making log in request to server")
            const response = await axios.post("/api/login", userData);
            dispatch(setUser(response.data));
            dispatch(setIsLoggedIn(true));
        } catch (error) {
            console.error(error);
        }
        console.log("RTK: We finished log in");
    };
}

export default userSlice.reducer;
