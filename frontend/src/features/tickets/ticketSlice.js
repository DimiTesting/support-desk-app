import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import ticketService from "./ticketService"
import {extractErrorMessage} from "../../utils"

const initialState = {
    tickets: [], 
    ticket: {},
    isLoading: false, 
    isError: false,
    isSuccess: false, 
    message: ""
}

//Create ticket
export const createTicket = createAsyncThunk("tickets/create", async(ticketData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const ticketSlice = createSlice({
    name: "ticket", 
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer