import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store, {persistor} from './store/store.ts';
import {PersistGate} from "redux-persist/integration/react";
import 'normalize.css';
import { Router } from './Router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
