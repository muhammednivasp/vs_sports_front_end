import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLELOGIN } from './constants/constants'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <GoogleOAuthProvider clientId={GOOGLELOGIN}>

      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </GoogleOAuthProvider>

  </Provider>

)
