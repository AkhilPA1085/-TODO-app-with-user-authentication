import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profileSlice";
import postSlice from "./features/posts/postSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, REHYDRATE,PURGE, REGISTER,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    profile: profileReducer,
    posts:postSlice
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            })
    })
}

export const store = makeStore();
export const persistor = persistStore(store)