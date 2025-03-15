import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

// Fetch all services
export const fetchServices = createAsyncThunk(
  'services/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/admin/get-all-service');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load services');
    }
  }
);

export const fetchServicesDetails = createAsyncThunk(
  'services/fetchServicesDetails',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/admin/service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load services');
    }
  }
);

export const deleteServices = createAsyncThunk(
  'services/deleteServices',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/admin/service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load services');
    }
  }
);

export const getActualServiceDetals = createAsyncThunk(
  'services/getActualServiceDetals',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/admin/actual-service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load services');
    }
  }
);



export const fetchServicesForProvider = createAsyncThunk(
  'services/fetchServicesForProvider',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/admin/service');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load services');
    }
  }
);
// Fetch service option by ID
export const fetchServiceOption = createAsyncThunk(
  'services/fetchOption',
  async({serviceId, latitude, longitude, radius,date},{ rejectWithValue }) => {
    try {
      console.log("Fetching service option for ID:", serviceId,date);
      const response = await apiClient.post(`/service-provider/get-providers-within-radius`, {
        serviceId,
        latitude,
        longitude,
        radius,
        date
      });
      console.log("Service option response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load service option");
    }
  }
);

export const fetchProvidersWithinRadius = createAsyncThunk(
  "providers/fetchWithinRadius",
  async ({ latitude, longitude, radius, serviceId }, { rejectWithValue }) => {
    try {
      console.log("Fetching providers with: property of lat and long", latitude, longitude, radius, serviceId);
      const response = await apiClient.post("/service-provider/get-providers-within-radius", {
        latitude,
        longitude,
        radius,
        serviceId,
      });
      console.log("Providers response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching providers:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch providers");
    }
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState: { 
    services: [], 
    serviceOptions: [], // Added serviceOptions array
    providers: [],
    loading: false, 
    error: null,
    fetchServicesForProvider:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        console.log("Services fetched successfully");
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        console.log("Failed to fetch services");
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch service option by ID
      .addCase(fetchServiceOption.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceOption.fulfilled, (state, action) => {
        console.log("Service option fetched successfully");
        state.loading = false;
        state.serviceOptions = action.payload; // Store the fetched service options
      })
      .addCase(fetchServiceOption.rejected, (state, action) => {
        console.log("Failed to fetch service option");
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProvidersWithinRadius.pending, (state) => {
        console.log("pending started");
        state.loading = true;
      })
      .addCase(fetchProvidersWithinRadius.fulfilled, (state, action) => {
        console.log("Providers fetched successfully".action.payload);
        state.loading = false;
        state.providers = action.payload.returnProviders; // Store fetched providers
      })
      .addCase(fetchProvidersWithinRadius.rejected, (state, action) => {
        console.log("Failed to fetch providers");
        state.loading = false;
        state.error = action.payload;
      })
     .addCase(fetchServicesForProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesForProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchServicesForProvider = action.payload; // Save fetched data
      })
      .addCase(fetchServicesForProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
