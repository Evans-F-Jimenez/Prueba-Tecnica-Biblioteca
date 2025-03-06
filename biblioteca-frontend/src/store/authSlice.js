import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:5000/api";

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/register`, userData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/login`, userData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // Registro
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.usuario;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.usuario;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;