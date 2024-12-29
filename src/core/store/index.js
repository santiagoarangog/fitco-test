import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import common from "./common";

const persistConfig = {
  key: "root",
  storage,
};

const commonPersistedReducer = persistReducer(persistConfig, common);

const store = configureStore({
  reducer: {
    common: commonPersistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
