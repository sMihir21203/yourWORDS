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
} from "./Pages/PagesIndex.js";
import { Header,Footer } from "./Components/CompsIndex.js";

export const WebRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element=<Home /> />
          <Route path='/about' element=<About /> />
          <Route path='/dashboard' element=<Dashboard /> />
          <Route path='/portfolio' element=<Portfolio /> />
          <Route path='/sign-in' element=<SignIn /> />
          <Route path='/sign-up' element=<SignUp /> />
          <Route path='/*' element=<NotFound /> />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
