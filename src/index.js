import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import WebComponent from './Pages/ExercisePage';
import Login from './Pages/Login'
import List from './Pages/List'
import PosePage from './Pages/PosePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/exercise",
    element:<WebComponent/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/poses",
    element:<List/>
  },
  {
    path:"/poses/posepage",
    element:<PosePage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
