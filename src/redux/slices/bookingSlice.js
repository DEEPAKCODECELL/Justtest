import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

// Initiate Booking
export const initiateBooking = createAsyncThunk(
  "booking/initiate",
  async ( { selectedDate, selectedDuration, serviceOptionId,selectedTime, uniqueProvidersArray } , { rejectWithValue }) => {
    try {
      console.log("Initiating booking with data:", selectedDate, selectedDuration, selectedTime, uniqueProvidersArray,serviceOptionId );
     const response = await apiClient.post("/booking/initiate", {
        date:selectedDate, duration:selectedDuration,serviceoption:serviceOptionId, start_time:selectedTime, providersList:uniqueProvidersArray 
     });
      console.log("Booking initiated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error initiating booking:", error);
      return rejectWithValue(error.response?.data || "Failed to initiate booking");
    }
  }
);

// Confirm Booking
export const confirmBooking = createAsyncThunk(
  "booking/confirm",
  async ({ bookingId, paymentStatus }, { rejectWithValue }) => {
    try {
      console.log("Confirming booking:", bookingId, "Payment Status:", paymentStatus);
      const response = await apiClient.post("/booking/confirm", {
        bookingId,
        paymentStatus
      });
      console.log("Booking confirmed successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error confirming booking:", error);
      return rejectWithValue(error.response?.data || "Failed to confirm booking");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    currentBooking: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Initiate Booking
      .addCase(initiateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiateBooking.fulfilled, (state, action) => {
        console.log("Booking initiated successfully");
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(initiateBooking.rejected, (state, action) => {
        console.log("Failed to initiate booking");
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm Booking
      .addCase(confirmBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        console.log("Booking confirmed successfully");
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        console.log("Failed to confirm booking");
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
