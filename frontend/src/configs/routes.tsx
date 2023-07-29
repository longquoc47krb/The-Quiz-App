import { lazy } from "react";
import { TRoute } from "../interfaces";
import LoadingPage from "../pages/LoadingPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const SigninPage = lazy(() => import("../pages/LoginPage"));
const QuizPage = lazy(() => import("../pages/QuizPage"));
const OAuthPage = lazy(() => import("../pages/OAuthPage"));
const SignUpPage = lazy(() => import("../pages/RegisterPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));

export enum Routes {
  SignIn = "/login",
  SignUp = "/signup",
  ResetPassword = "/reset-password",
  Home = "/",
  Quiz = "/quiz/:id",
  Profile = "/profile",
  Product = "/product/:id",
  OAuth = "/auth",
}
export const authRoutes = [
  {
    path: Routes.SignIn,
    element: SigninPage,
  },
  {
    path: Routes.SignUp,
    element: SignUpPage,
  },
];

export const publicRoutes = [
  {
    path: Routes.Home,
    element: HomePage,
  },
  {
    path: Routes.OAuth,
    element: OAuthPage,
  },
  {
    path: "/loading",
    element: LoadingPage,
  },
];

export const privateRoutes = [
  {
    path: Routes.Quiz,
    element: QuizPage,
  },
  // {
  //   path: Routes.Profile,
  //   element: ProfilePage,
  // },
];
