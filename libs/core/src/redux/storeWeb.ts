import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import authReducer from './authSlice';
import rootSaga from './sagas/rootSaga';
import userReducer from './userSlice';
import uiReducer from './ui/uiSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware);
  },
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// @ts-ignore
localStorage.setItem('redux', null);
// @ts-ignore
localStorage.setItem('persist:root', null);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store, persistor };
