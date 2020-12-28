import React from 'react';
import {ToastProvider} from 'react-toast-notifications';

import Routes from './routes';

import './assets/styles/global.css';

function App() {
  return (
    <ToastProvider placement="top-right">
      <Routes />
    </ToastProvider>
  );
}

export default App;
