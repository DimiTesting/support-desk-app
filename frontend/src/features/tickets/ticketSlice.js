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

//Get tickets
export const getTickets = createAsyncThunk("getTickets/all", async(_, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

//Get ticket
export const getTicket = createAsyncThunk("getTicket/ticketID", async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTicket(ticketId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const closeTicket = createAsyncThunk("closeTicket/ticketID", async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId, token)
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
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.tickets = initialState.tickets.map((ticket) => ticket._id === action.payload._id ? ticket.status = "closed": ticket)
            })
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer