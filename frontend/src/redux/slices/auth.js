import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import Cookies from "js-cookie";

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (params) => {
    const { data } = await axios.post("/api/users/auth", params);
    return data;
  }
);

// export const fetchRegister = createAsyncThunk('register/fetchRegister', async (params) => {
//     const { data } = await axios.post('/api/users', params);
//     return data;
// })

const initialState = {
  data: null,
  status: "loading",
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);

      ///for hosting only
      //   Cookies.set("jwt", action.payload.token, { expires: 30 });
    },
    logout: (state, action) => {
      state.userInfo = null;
      ///for hosting only
      Cookies.remove("jwt");
      localStorage.clear();
    },
  },
  extraReducers: {
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});
// export const { setCredentials } = authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
