import { GroupOutlined, LinkOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import { FC, useContext } from "react";
import { Breadcrumbs } from "../../breadcrumbs";
import { SiteConfigurationTable } from "../../components/site-configuration-table";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { SiteConfigurationDrawer } from "../../modals/site-configuration-drawer";
import { setShowSiteInfoModal } from "../../store/slices/events";
import { ThemeContext } from "../../theme";

export const SiteConfiguration: FC = () => {
  const dispatch = useAppDispatch();
  const { appTheme } = useContext(ThemeContext);
  const darkTheme = appTheme === "dark";

  const handleFilterClick = () => {
    dispatch(setShowSiteInfoModal(true));
  };

  const handleSiteInfo = () => {
    dispatch(setShowSiteInfoModal(true));
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        {" "}
        <Col span={24}>
          <Breadcrumbs />
        </Col>
        <Col span={24}>
          <Space>
            <Button
              size="large"
              className="primary_button"
              type="primary"
              icon={<PlusOutlined color="white" />}
              onClick={handleFilterClick}
            >
              Add Site
            </Button>
            <Button
              size="large"
              className="secondary_button"
              type="primary"
              icon={<GroupOutlined />}
              // onClick={handleFilterClick}
            >
              Add Site
            </Button>
            <Button
              size="large"
              disabled={true}
              className={`${
                darkTheme ? "dark_disabled_button" : "light_disabled_button"
              }`}
              type="primary"
              icon={<LinkOutlined />}
              // onClick={handleFilterClick}
            >
              Link Site
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <SiteConfigurationTable className="alerts_table" />
        </Col>
      </Row>
      <SiteConfigurationDrawer handlePageFilter={handleSiteInfo} />
    </>
  );
};
