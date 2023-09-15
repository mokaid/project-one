import type { FC } from "react";
import {
  AimOutlined,
  AlertOutlined,
  BellOutlined,
  ControlOutlined,
  DashboardOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import { ConfigProvider, type ThemeConfig } from "antd";

import { AlarmRoute, AppRoute } from "../../routes/routes";
import { Navigation, type NavigationProps } from "../navigation";

type Props = {
  className?: string;
  dataTestId?: string;
};

const navItems: NavigationProps["items"] = [
  { label: "Home", href: AppRoute.Dashboard, icon: <DashboardOutlined /> },
  {
    label: "Alarm",
    href: AppRoute.Alarm,
    icon: <AlertOutlined />,
    subNav: [
      {
        label: "Record",
        href: `${AppRoute.Alarm}/${AlarmRoute.Record}`,
      },
      {
        label: "Self Recovery",
        href: `${AppRoute.Alarm}/${AlarmRoute.SelfRecovery}`,
      },
    ],
  },
  {
    label: "Site Map",
    href: AppRoute.SiteMap,
    icon: <AimOutlined />,
  },
  {
    label: "Site Configuration",
    href: AppRoute.SiteConfiguration,
    icon: <ControlOutlined />,
  },

  {
    label: "Masked Source",
    href: AppRoute.MaskedSource,
    icon: <BellOutlined />,
  },

  {
    label: "Disconnected Sites",
    href: AppRoute.DisconnectedSites,
    icon: <DisconnectOutlined />,
  },
];

const themeConfig: ThemeConfig = {
  components: {
    Menu: {
      colorSplit: "transparent",
    },
  },
};

export const DashboardNavigation: FC<Props> = ({
  className,
  dataTestId = "dashboard-navigation",
}) => (
  <ConfigProvider theme={themeConfig}>
    <Navigation
      className={className}
      mode="vertical"
      items={navItems}
      dataTestId={dataTestId}
    />
  </ConfigProvider>
);
