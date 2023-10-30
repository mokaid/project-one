import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { DashboardLayout } from "../components/dashboard-layout";
import { AlarmRecord } from "../pages/alarm-record";
import { Dashboard } from "../pages/dashboard";

import { AlarmRoute, AlertRoute, AppRoute } from "./routes";
import { AlertMap } from "../pages/alert-map";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: "Sign in",
  },
  {
    path: "/sign-up",
    element: "Sign up",
  },
  {
    path: AppRoute.Home,
    element: <DashboardLayout />,
    errorElement: <>TODO: Add 404 page</>,
    handle: {
      crumb: () => ({
        title: "Home",
      }),
    },
    children: [
      {
        path: "",
        element: <Navigate to={AppRoute.Dashboard} replace={true} />,
      },
      {
        path: AppRoute.Dashboard,
        element: <Dashboard />,
       
      },
      {
        path: AlertRoute.alertMap,
        element: <AlertMap />,
        index: true,
        handle: {
          crumb: () => ({
            title: "0001 Dubai Mall",
          }),
        },
      },
      {
        path: AppRoute.Alarm,
        element: <Outlet />,
        handle: {
          crumb: () => ({
            title: "Alarm",
          }),
        },
        children: [
          {
            path: "",
            element: <Navigate to={AlarmRoute.Record} replace={true} />,
          },
          {
            path: AlarmRoute.Record,
            element: <AlarmRecord />,
            index: true,
            handle: {
              crumb: () => ({
                title: "Record",
              }),
            },
          },
          {
            path: AlarmRoute.SelfRecovery,
            element: "Alarm Self Recovery",
          },
        ],
      },
      {
        path: AppRoute.SiteMap,
        element: "Site Map",
      },
      {
        path: AppRoute.SiteConfiguration,
        element: "Site Configuration",
      },
      {
        path: AppRoute.MaskedSource,
        element: "Masked Source",
      },
      {
        path: AppRoute.DisconnectedSites,
        element: "Disconnected Sites",
      },
      {
        path: AppRoute.Notifications,
        element: "Notifications",
      },
    ],
  },
]);
