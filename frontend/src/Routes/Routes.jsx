import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Dashboard,
  Home,
  NotFound,
  Portfolio,
  SignIn,
  SignUp,
} from "../Pages/PagesIndex.js";
import { Header, Footer } from "../Components/CompsIndex.js";
import PrivateRoute from "./PrivateRoute.jsx";

export const WebRoutes = () => {
  return (
    <>
      <BrowserRouter>
        
        
          <Header/>
          <Routes>
            <Route 
                  path='/' 
                  element={<Home />} 
            />
            <Route 
                  path='/about' 
                  element={<About />} 
            />
            <Route element={<PrivateRoute />} >
              <Route 
                  path='/dashboard' 
                  element={<Dashboard />} 
              />
            </Route>
            <Route 
                  path='/portfolio' 
                  element={<Portfolio />} 
            />
            <Route 
                  path='/sign_in' 
                  element={<SignIn />} 
           />
            <Route 
                  path='/sign_up' 
                  element={<SignUp />} 
           />
            <Route 
                  path='/*' 
                  element={<NotFound />} 
            />
          </Routes>
       
        <Footer />
      </BrowserRouter>
    </>
  );
};
