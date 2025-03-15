import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";
export const fetchProviders = createAsyncThunk(
  "providers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching providers for service: for yp bh");
      const response = await apiClient.get("/auth/getprofile");
      console.log("Providers fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching providers:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch providers");
    }
  }
);

export const updateProviderDetails = createAsyncThunk(
  "providers/update",
  async ({selectedId, ageGroup, adhadharCard,status}, { rejectWithValue }) => {
    try {
      console.log("Updating provider details for:", selectedId, ageGroup, adhadharCard);
      const response = await apiClient.put(`/service-provider/update`,{ServiceId:selectedId, age:ageGroup, adhadharCard,status});
      console.log("Provider updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating provider:", error);
      return rejectWithValue(error.response?.data || "Failed to update provider");
    }
  }
);

export const createAvailability = createAsyncThunk(
  "availability/create",
  async ({ start_time,end_time,date,latitude,longitude }, { rejectWithValue }) => {
    try {
      console.log(start_time, end_time, date, latitude, longitude);
      const response = await apiClient.post("/service-provider/create-availibility", {
        start_time,
        end_time,
        date,
        latitude,
        longitude
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create availability");
    }
  }
);

export const updateAvailability = createAsyncThunk(
  "availability/update",
  async ({latitude,longitude}, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/service-provider/update-availibility", {
         latitude,longitude
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update availability");
    }
  }
);


export const verifyAadhaar = createAsyncThunk(
  "aadhaar/verify",
  async (aadhaarNumber, { dispatch, rejectWithValue }) => {
    try {
      console.log("Verifying Aadhaar:", aadhaarNumber);
      const response = await apiClient.post("/auth/verify-aadhaar", { aadhaarNumber });

      if (response.data.success) {
        console.log("Aadhaar verified successfully.");
        dispatch(sendAadhaarOTP(aadhaarNumber)); // Trigger OTP sending
        return response.data;
      } else {
        return rejectWithValue("Invalid Aadhaar card.");
      }
    } catch (error) {
      console.error("Aadhaar verification failed:", error);
      return rejectWithValue(error.response?.data || "Aadhaar verification failed.");
    }
  }
);

export const sendAadhaarOTP = createAsyncThunk(
  "aadhaar/sendOTP",
  async (aadhaarNumber, { rejectWithValue }) => {
    try {
      console.log("Sending OTP for Aadhaar:", aadhaarNumber);
      const response = await apiClient.post("/auth/send-aadhaar-otp", { aadhaarNumber });

      if (response.data.success) {
        console.log("OTP sent successfully.",response.data);
        return response.data;
      } else {
        return rejectWithValue("Failed to send OTP.");
      }
    } catch (error) {
      console.error("OTP sending failed:", error);
      return rejectWithValue(error.response?.data || "OTP sending failed.");
    }
  }
);

export const verifyAadhaarOTP = createAsyncThunk(
  "aadhaar/verifyOTP",
  async ({ aadhaarNumber, otp }, { rejectWithValue }) => {
    try {
      console.log("Verifying Aadhaar OTP:", otp);
      const response = await apiClient.post("/auth/verify-aadhaar-otp", { aadhaarNumber, otp });

      if (response.data.success) {
        console.log("OTP verified successfully.");
        return response.data;
      } else {
        return rejectWithValue("Invalid OTP.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      return rejectWithValue(error.response?.data || "OTP verification failed.");
    }
  }
);


const initialState = {
  providers: [],
  loading: false,
  error: null,
  availability: null,
};

// Providers Slice
const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Providers - Pending
        .addCase(fetchProviders.pending, (state) => {
        console.log("pending");
        state.loading = true;
        state.error = null;
      })
      // Fetch Providers - Fulfilled
        .addCase(fetchProviders.fulfilled, (state, action) => {
            console.log("fulfilled");
        state.loading = false;
        state.providers = action.payload;
      })
      // Fetch Providers - Rejected
        .addCase(fetchProviders.rejected, (state, action) => {
         console.log("rejected");
        state.loading = false;
        state.error = action.payload;
        })
      .addCase(updateProviderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProviderDetails.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProvider = action.payload.data;
        console.log("fullfilled check", updatedProvider);
        state.providers = state.providers.map((provider) =>
          provider._id === updatedProvider._id ? updatedProvider : provider
        );
      })
      .addCase(updateProviderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
      })
      .addCase(createAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
      })
      .addCase(updateAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default providersSlice.reducer;
