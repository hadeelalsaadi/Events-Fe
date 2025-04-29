import './index.css'
import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import { UserProvider } from './context/UserContext.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
 
 <UserProvider>
<BrowserRouter>
    <App />
  </BrowserRouter>
 </UserProvider>
 
);


