import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import AuthPageLayout from "./components/AuthPageLayout";
import AuthContextProvider from "./contexts/AuthContextProvider";
import BlogDataContextProvider from "./contexts/BlogDataContextProvider";
import Signin from "./pages/authentication/Signin";
import Signup from "./pages/authentication/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogsPage from "./pages/blogs";
import AuthoredBlogs from "./pages/blogs/AuthoredBlogs";
import NewBlog from "./pages/blogs/NewBlog";

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/auth/signin");
  // }, [navigate]);

  return (
    <>
      <CssBaseline />
      <AuthContextProvider>
        <Routes>
          <Route path="/auth" element={<AuthPageLayout />}>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/blogs">
            <Route
              index
              element={
                <BlogDataContextProvider>
                  <ProtectedRoute>
                    <BlogsPage />
                  </ProtectedRoute>
                </BlogDataContextProvider>
              }
            />
            <Route
              path="authored"
              element={
                <BlogDataContextProvider>
                  <ProtectedRoute>
                    <AuthoredBlogs />
                  </ProtectedRoute>
                </BlogDataContextProvider>
              }
            />
            <Route
              path="new"
              element={
                <BlogDataContextProvider>
                  <ProtectedRoute>
                    <NewBlog />
                  </ProtectedRoute>
                </BlogDataContextProvider>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}
export default App;
