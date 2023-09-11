import { type FC, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Layout, Space, theme } from "antd";
import Cookies from "js-cookie";

import { SIDER_MENU_COLLAPSED_STATE_COOKIE } from "../../const/cookies";
import { ThemeContext } from "../../theme";
import { DashboardNavigation } from "../dashboard-navigation";
import { Logo } from "../logo";
import { NotificationsButton } from "../notifications-button";
import { SoundNotificationsSwitcher } from "../sound-notifications-switcher";
import { ThemeSwitcher } from "../theme-switcher";
import { UserPanel } from "../user-panel";

import styles from "./index.module.css";

const { Header, Content, Sider } = Layout;

const initialCollapsed =
  Cookies.get(SIDER_MENU_COLLAPSED_STATE_COOKIE) === "true";

export const DashboardLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const { appTheme } = useContext(ThemeContext);
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const handleCollapseMenu = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    Cookies.set(SIDER_MENU_COLLAPSED_STATE_COOKIE, `${newCollapsed}`);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: colorBgContainer,
            triggerBg: colorBgContainer,
            siderBg: colorBgContainer,
          },
        },
      }}
    >
      <Layout className={styles.container}>
        <Sider
          theme={appTheme}
          collapsible={true}
          collapsed={collapsed}
          onCollapse={handleCollapseMenu}
        >
          <Logo collapsed={collapsed} className={styles.logo} />
          <DashboardNavigation />
        </Sider>

        <Layout>
          <Header
            className={styles.header}
            style={{ backgroundColor: colorBgContainer }}
          >
            <Space size="large" align="center" className={styles.controls}>
              <ThemeSwitcher />
              <SoundNotificationsSwitcher />
              <NotificationsButton />
              <UserPanel />
            </Space>
          </Header>

          <Content
            style={{ color: colorText }}
            className={styles.content}
            data-testid="main-content"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
