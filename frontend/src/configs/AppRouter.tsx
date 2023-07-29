import { Suspense } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import PageNotFound from "../pages/PageNotFound";
import { authRoutes, privateRoutes, publicRoutes } from "./routes";
import useAuth from "../hooks/useAuth";
function AppRouter() {
  const { user } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<route.element />}
              />
            ))}
            {!user &&
              authRoutes.map((route) => (
                <Route
                  path={route.path}
                  key={route.path}
                  element={<route.element />}
                />
              ))}
            {user &&
              privateRoutes.map((route) => (
                <Route
                  path={route.path}
                  key={route.path}
                  element={<route.element />}
                />
              ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
