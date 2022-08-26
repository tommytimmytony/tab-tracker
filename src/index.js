import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { TabsProvider } from './contexts/TabsContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <TabsProvider>
      <App />
    </TabsProvider>
  // </React.StrictMode>
);

