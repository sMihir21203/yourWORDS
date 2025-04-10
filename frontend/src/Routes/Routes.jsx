import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, ThemeProvider, ForgotPassword, ResetPassword, ScrollToTop } from "../Components/CompsIndex.js";
import {
  AboutUs,
  ContactUs,
  Dashboard,
  Home,
  NotFound,
  Privacy_and_Policy,
  Search,
  SignIn,
  SignUp,
  Terms_and_Conditions,
} from "../Pages/PagesIndex.js";
import { DashBoardPrivateRoute, PostPrivateRoute } from './RoutesIndex.js';
import { PostPage, UpdatePost } from '../Pages/Dashboard/Posts/PostIndex.js'

export const WebRoutes = () => {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/about-us'
              element={<AboutUs />}
            />
            <Route element={<DashBoardPrivateRoute />} >
              <Route
                path='/dashboard'
                element={<Dashboard />}
              />
            </Route>
            <Route element={<PostPrivateRoute />} >
              <Route
                path='/update-post/:slug'
                element={<UpdatePost />}
              />
            </Route>
            <Route
              path='/post/:slug'
              element={<PostPage />}
            />
            <Route
              path='/search'
              element={<Search />}
            />
            <Route
              path='/terms-and-conditions'
              element={<Terms_and_Conditions />}
            />
            <Route
              path='/privacy-policy'
              element={<Privacy_and_Policy />}
            />
            <Route
              path='/contact-us'
              element={<ContactUs />}
            />
            <Route
              path='/sign-in'
              element={<SignIn />}
            />
            <Route
              path='/sign-up'
              element={<SignUp />}
            />
            <Route
              path='/forgot-password'
              element={<ForgotPassword />}
            />
            <Route
              path='/reset-password/:resetPassToken'
              element={<ResetPassword />}
            />
            <Route
              path='/*'
              element={<NotFound />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
