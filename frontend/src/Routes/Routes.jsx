import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, ThemeProvider, ForgotPassword, ResetPassword } from "../Components/CompsIndex.js";
import {
  About,
  Dashboard,
  Home,
  NotFound,
  Portfolio,
  Search,
  SignIn,
  SignUp,
} from "../Pages/PagesIndex.js";
import { DashBoardPrivateRoute, PostPrivateRoute } from './RoutesIndex.js';
import { PostPage, UpdatePost } from '../Pages/Dashboard/Posts/PostIndex.js'

export const WebRoutes = () => {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/about'
              element={<About />}
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
              path='/portfolio'
              element={<Portfolio />}
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
