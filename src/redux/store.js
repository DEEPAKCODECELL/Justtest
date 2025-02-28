import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import serviceReducer from './slices/serviceSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
