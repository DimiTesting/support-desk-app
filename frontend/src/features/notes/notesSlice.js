import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import notesService from "./notesService"
import { extractErrorMessage } from "../../utils"

const initialState = {
    notes: [], 
    isLoading: false, 
    isError: false, 
    isSuccess: false,
    message: ""
}

export const getNotes = createAsyncThunk('notes/getAll', async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.getNotes(ticketId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const createNote = createAsyncThunk(
    'notes/create',
    async ({noteText, ticketId}, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.createNotes(noteText, ticketId, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

export const noteSlice = createSlice({
    name: "note",
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes.push(action.payload)
            })
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer