import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { DashboardLayout } from "../components/dashboard-layout";
import { AlarmRecord } from "../pages/alarm-record";
import { Dashboard } from "../pages/dashboard";

import { AlarmRoute, AlertRoute, AppRoute } from "./routes";
import { AlertMap } from "../pages/alert-map";
import { AlarmSelfRecovery } from "../pages/alarm-self-recovery";
import { AlarmSelfRecoverySite } from "../pages/alarm-self-recovery-site";
// import { useAppSelector } from "../hooks/use-app-selector";
// import { getAlertMapId } from "../store/selectors/events";

// const siteId = useAppSelector(getAlertMapId);

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
          crumb: () => {
            const searchParams = new URLSearchParams(window.location.search);
            // Return a dynamic breadcrumb title using the 'name' parameter

            return {
              title: searchParams.get("title") || "",
            };
          },
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
            element: <AlarmSelfRecovery />,
            handle: {
              crumb: () => ({
                title: "Self Recovery",
              }),
            },
          },
          {
            path: AlarmRoute.SelfRecoverySite,
            element: <AlarmSelfRecoverySite />,
            index: true,
            handle: {
              crumb: () => {
                const searchParams = new URLSearchParams(
                  window.location.search,
                );
                // Return a dynamic breadcrumb title using the 'name' parameter

                return {
                  title: searchParams.get("title") || "",
                };
              },
            },
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
