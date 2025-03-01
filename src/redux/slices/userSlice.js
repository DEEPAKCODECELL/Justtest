import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient"; // Ensure you have an API client

// **Async action for sending OTP**
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ phone }, { rejectWithValue }) => {
    try {
      console.log(`Accessing Phone in userSlice: ${phone}`);
      const response = await apiClient.post("/auth/send-otp", { phone });
      console.log(response);
      return response.data; // Assuming API returns success response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// **Async action for verifying OTP**
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      console.log(`Verifying OTP for phone: ${phone} ${otp}`);
      const response = await apiClient.post("/auth/verify-otp", { phone, otp });
      console.log("check", response);
      return response.data; // Assuming API returns user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "OTP verification failed");
    }
  }
);

// **Async action to fetch user profile**
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("calling api")
      const response = await apiClient.get("/auth//getprofile");
      console.log("calling api",response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user data");
    }
  }
);

// **Async action for logout**
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("before hitting the api")
      const response = await apiClient.post("/auth/logout");
      console.log(response);
      return response.data; // Clear user data from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const updateUserLocation = createAsyncThunk(
  "user/updateUserLocation",
  async ({ latitude=null, longitude=null,searchQuery=null }, { rejectWithValue }) => {
    try {
      console.log("Before hitting the API to update location",searchQuery);
      const response = await apiClient.post("/auth/edit", { latitude, longitude,add_address:searchQuery });
      console.log("Location update response:", response.data);
      return response.data; // Update user location in the state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update location");
    }
  }
);



export const fetchAutocompleteSuggestions = createAsyncThunk(
  "user/fetchAutocompleteSuggestions",
  async ({ keyword, cityLat, cityLng, radius }, { rejectWithValue }) => {
    try {
      console.log("fetchAutocompleteSuggestions is hitted",keyword,cityLat,cityLat,radius);
      const response = await apiClient.post(`/location/autocomplete`, {
        keyword,
        cityLat,
        cityLng,
        radius,
      });
      console.log("fetchAutocompleteSuggestions is hitted",response);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue("No results found.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch suggestions.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: null,
    phone: null,
    suggestions: [],
  },
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.phone = null;
      state.error = null;
      state.loading = false;
      state.location = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // **Handle login**
      .addCase(loginUser.pending, (state, action) => {
        state.phone = action.meta.arg.phone;
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // **Handle OTP Verification**
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming API returns user data
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // **Handle fetching user profile**
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // **Handle logout**
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.phone = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserLocation.pending, (state) => {
        console.log("pending")
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUserLocation.fulfilled, (state, action) => {
         console.log("fulfilled");
        state.loading = false;
        if (state.location) {
          state.location = action.payload // Update user location
        }
      })
      .addCase(updateUserLocation.rejected, (state, action) => {
        console.log("failed");
        state.loading = false;
        state.error = action.payload || "Failed to update location";
      })

      .addCase(fetchAutocompleteSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAutocompleteSuggestions.fulfilled, (state, action) => {
        console.log("add cases", action.payload.data);
        state.loading = false;
        state.suggestions = action.payload.data;
      })
      .addCase(fetchAutocompleteSuggestions.rejected, (state, action) => {
        console.log("failed");
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
