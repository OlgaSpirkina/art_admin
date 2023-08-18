import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'


const broadcastChannel = new BroadcastChannel('session-expiration');

// Define a key for storing user data in localStorage
const LOCAL_STORAGE_KEY = 'localst';
export const login = createAsyncThunk('auth/login', async ({ username, password, persistData }, thunkAPI) => {
    try {
        // If persistData is true, perform initial login with username and password
        if (persistData) {
            const res = await axios.post('http://localhost:4000/login', { username, password });
            console.log("from redux");
            console.log(res);
            console.log(res.data);

            // Store user data in localStorage only if persistData is true
            if (persistData) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res.data));
            }
            return res.data;
        }

        // If persistData is false, restore user data from localStorage
        const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            return { username: userData.username };
        }
        return { username: '' };
    }catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.message);
    }

})
const initialState = {
    user: '',
    isLoggedIn: false,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state,action) => {
            state.user = ''
            state.isLoggedIn= false
            state.loading = false
            state.error= null
        }
    },
    extraReducers: (builder) => {
        builder
                .addCase(login.fulfilled, (state, action) => {
                    state.user = action.payload.username
                    state.isLoggedIn = true
                    state.loading = false
                    state.error = null
                })
                .addCase(login.pending, (state, action)=>{
                    state.loading = true
                })
                .addCase(login.rejected, (state, action) => {
                    state.loading = false
                    state.isLoggedIn = false
                    state.error = action.payload
                })
    }
})
export const { logout } = authSlice.actions

export default authSlice.reducer