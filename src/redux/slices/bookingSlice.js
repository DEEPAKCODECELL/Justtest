import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

// Initiate Booking
export const initiateBooking = createAsyncThunk(
  "booking/initiate",
  async ( { selectedDate, selectedDuration, serviceOptionId,selectedTime, uniqueProvidersArray,serviceId,isScheduled } , { rejectWithValue }) => {
      try {
        if(!isScheduled) {
            start_time = getInstantTime();
        }
      console.log("Initiating booking with data:", selectedDate, selectedDuration, selectedTime, uniqueProvidersArray,serviceOptionId );
     const response = await apiClient.post("/booking/initiate", {
         date: selectedDate, duration: selectedDuration, serviceoption: serviceOptionId, start_time: isScheduled?selectedTime:start_time, providersList: uniqueProvidersArray,
         actualService:serviceId
     });
      console.log("Booking initiated successfully:", response);
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

export const getAllBookings = createAsyncThunk(
  "booking/getAll",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching all bookings...");
      const response = await apiClient.get("/booking/all");
      console.log("Fetched bookings successfully:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch bookings");
    }
  }
);


export const applyPromoCode = createAsyncThunk(
  "booking/applyPromoCode",
  async ({ bookingId, promoCode }, { rejectWithValue }) => {
    try {
      console.log("Applying promo code...");
      const response = await apiClient.post(`/promocode/apply-code`, {
        bookingId,
        promoCode,
      });

      console.log("Promo code applied successfully:", response);
      return response.data; // Should return updated booking details
    } catch (error) {
      console.error("Error applying promo code:", error);
      return rejectWithValue(error.response?.data || "Failed to apply promo code");
    }
  }
);

export const getFullBookingDetails = createAsyncThunk(
  "booking/getFullDetails",
  async ({ BookingId }, { rejectWithValue }) => {
    try {
      console.log("Fetching booking details for transactionId:", BookingId);

      const response = await apiClient.post("/booking/confirm-booking-details", {
        BookingId,
      });
      console.log("Full Booking Details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching booking details:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch booking details");
    }
  }
);


export const fetchBookingDetails = createAsyncThunk(
  "booking/fetchBookingDetails",
  async ({ bookingId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/booking/${bookingId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch booking details");
    }
  }
);


const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    currentBooking: null,
    allBookings: [],
    loading: false,
    successPromo: false,
    promocodediscount:0,
    error: null,
    bookingDetails: {},
    ConfirmbookingDetails: null
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
      })

      // Fetch All Bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        console.log("Fetched all bookings successfully");
        state.loading = false;
        state.allBookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        console.log("Failed to fetch bookings");
        state.loading = false;
        state.error = action.payload;
      })

      // Apply Promo Code
      .addCase(applyPromoCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyPromoCode.fulfilled, (state, action) => {
        console.log("Promo code applied successfully");
        state.loading = false;
        if (state.currentBooking) {
            state.successPromo = true;
            state.promocodediscount = action.payload.discount;
            console.log("get payload",action.payload);
        }
      })
      .addCase(applyPromoCode.rejected, (state, action) => {
        console.log("Failed to apply promo code");
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload;
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFullBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFullBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.ConfirmbookingDetails = action.payload;
      })
      .addCase(getFullBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch booking details";
      });
  },
});

const getInstantTime = () => {
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const currentHours = now.getHours();
    // Calculate the next 15-minute interval
    const nextInterval = 15 - (currentMinutes % 15);
    let startTime = new Date(now);
    startTime.setMinutes(currentMinutes + nextInterval);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);
  return startTime;
}
export default bookingSlice.reducer;
