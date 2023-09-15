import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { DashboardLayout } from "../components/dashboard-layout";
import { Dashboard } from "../pages/dashboard";

import { AlarmRoute, AppRoute } from "./routes";

export const router = createBrowserRouter([
  {
    path: AppRoute.Home,
    element: <Navigate to={AppRoute.Dashboard} replace={true} />,
    errorElement: <>TODO: 404 page</>,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: AppRoute.Dashboard,
        element: <Dashboard />,
      },
      {
        path: AppRoute.Alarm,
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Navigate to={AlarmRoute.Record} replace={true} />,
          },
          {
            path: AlarmRoute.Record,
            element: "Alarm Record",
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
        path: AppRoute.DisconnectSite,
        element: "Disconnect Site",
      },
      {
        path: AppRoute.Notifications,
        element: "Notifications",
      },
    ],
  },
]);
