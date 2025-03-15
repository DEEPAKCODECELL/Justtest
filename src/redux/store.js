import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import serviceReducer from './slices/serviceSlice';
import BookingReducer from "./slices/bookingSlice";
import ProviderReducer from "./slices/ProviderSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
    booking: BookingReducer,
    provider: ProviderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
