import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

// 📌 Fetch Services
export const getServices = createAsyncThunk(
    "admin/getServices",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching all services...");
            const response = await apiClient.get("/services");
            console.log("Fetched Services:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching services:", error);
            return rejectWithValue(error.response?.data || "Failed to fetch services");
        }
    }
);

// 📌 Create a New Service
export const createService = createAsyncThunk(
    "admin/createService",
    async (serviceData, { rejectWithValue }) => {
        try {
            console.log("Creating service:", serviceData);
            const response = await apiClient.post("/services", serviceData);
            console.log("Service Created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating service:", error);
            return rejectWithValue(error.response?.data || "Failed to create service");
        }
    }
);

// 📌 Update a Service
export const updateService = createAsyncThunk(
    "admin/updateService",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            console.log(`Updating service ID: ${id}`, data);
            const response = await apiClient.put(`/services/${id}`, data);
            console.log("Service Updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating service:", error);
            return rejectWithValue(error.response?.data || "Failed to update service");
        }
    }
);

// 📌 Delete a Service
export const deleteService = createAsyncThunk(
    "admin/deleteService",
    async (id, { rejectWithValue }) => {
        try {
            console.log(`Deleting service ID: ${id}`);
            await apiClient.delete(`/services/${id}`);
            console.log("Service Deleted");
            return id;
        } catch (error) {
            console.error("Error deleting service:", error);
            return rejectWithValue(error.response?.data || "Failed to delete service");
        }
    }
);

// 📌 Fetch Actual Services
export const getActualServices = createAsyncThunk(
    "admin/getActualServices",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching actual services...");
            const response = await apiClient.get("/actual-services");
            console.log("Fetched Actual Services:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching actual services:", error);
            return rejectWithValue(error.response?.data || "Failed to fetch actual services");
        }
    }
);

// 📌 Create Actual Service
export const createActualService = createAsyncThunk(
    "admin/createActualService",
    async (data, { rejectWithValue }) => {
        try {
            console.log("Creating actual service:", data);

            // Convert data to FormData
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("service", data.service);

            // Append array fields
            data.expert_is_trained_in.forEach((item) =>
                formData.append("expert_is_trained_in[]", item)
            );
            data.service_excludes.forEach((item) =>
                formData.append("service_excludes[]", item)
            );
            data.what_we_need_from_you.forEach((item) =>
                formData.append("what_we_need_from_you[]", item)
            );

            // Append images correctly
            data.actualServiceImages.forEach((image) => {
                formData.append("actualServiceImages", {
                    uri: image,  // Image path
                    name: image.split("/").pop(),  // Extract filename
                    type: "image/jpeg",  // Adjust based on actual file type
                });
            });

            console.log("Formatted FormData:", formData);

            // Send FormData request
            const response = await apiClient.post("/admin/create-actual-service", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Actual Service Created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating actual service:", error);
            return rejectWithValue(error.response?.data || "Failed to create actual service");
        }
    }
);



// 📌 Update Actual Service
export const updateActualService = createAsyncThunk(
    "admin/updateActualService",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            console.log(`Updating actual service ID: ${id}`, data);
            const response = await apiClient.put(`/actual-services/${id}`, data);
            console.log("Actual Service Updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating actual service:", error);
            return rejectWithValue(error.response?.data || "Failed to update actual service");
        }
    }
);

// 📌 Delete Actual Service
export const deleteActualService = createAsyncThunk(
    "admin/deleteActualService",
    async (id, { rejectWithValue }) => {
        try {
            console.log(`Deleting actual service ID: ${id}`);
            await apiClient.delete(`/actual-services/${id}`);
            console.log("Actual Service Deleted");
            return id;
        } catch (error) {
            console.error("Error deleting actual service:", error);
            return rejectWithValue(error.response?.data || "Failed to delete actual service");
        }
    }
);

// 📌 Fetch Options
export const getOptions = createAsyncThunk(
    "admin/getOptions",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching service options...");
            const response = await apiClient.get("/options");
            console.log("Fetched Options:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching options:", error);
            return rejectWithValue(error.response?.data || "Failed to fetch options");
        }
    }
);

// 📌 Create Option
export const createOption = createAsyncThunk(
    "admin/createOption",
    async (optionData, { rejectWithValue }) => {
        try {
            console.log("Creating service option:", optionData);
            const response = await apiClient.post("/options", optionData);
            console.log("Option Created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating option:", error);
            return rejectWithValue(error.response?.data || "Failed to create option");
        }
    }
);

// 📌 Update Option
export const updateOption = createAsyncThunk(
    "admin/updateOption",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            console.log(`Updating option ID: ${id}`, data);
            const response = await apiClient.put(`/options/${id}`, { ...data, actualServiceImages: data.images, });
            console.log("Option Updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating option:", error);
            return rejectWithValue(error.response?.data || "Failed to update option");
        }
    }
);

// 📌 Delete Option
export const deleteOption = createAsyncThunk(
    "admin/deleteOption",
    async (id, { rejectWithValue }) => {
        try {
            console.log(`Deleting option ID: ${id}`);
            await apiClient.delete(`/options/${id}`);
            console.log("Option Deleted");
            return id;
        } catch (error) {
            console.error("Error deleting option:", error);
            return rejectWithValue(error.response?.data || "Failed to delete option");
        }
    }
);
