import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import serviceReducer from './slices/serviceSlice';
import BookingReducer from "./slices/bookingSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
    booking:BookingReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
