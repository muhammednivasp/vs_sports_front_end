import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './userDataSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userDataSlice'
import clubReducer from './clubDataSlice'
import tempReducer from './updateDataSlice'
import adminReducer from './adminDataSlice'

const persistConfig = {
  key: 'user',
  storage,
};
const clubConfig = {
  key: 'club',
  storage,
};
const tempConfig = {
  key: 'temp',
  storage,
};
const adminConfig = {
  key: 'admin',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const clubpersistReducer = persistReducer(clubConfig, clubReducer);
const temppersistReducer = persistReducer(tempConfig, tempReducer);
const adminpersistReducer = persistReducer(adminConfig, adminReducer);


const Store = configureStore({
  reducer: {
    user: persistedReducer,
    club: clubpersistReducer,
    temp: temppersistReducer,
    admin:adminpersistReducer
  },
});

const persistor = persistStore(Store);

export { Store, persistor };
