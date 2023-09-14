import type { CSSProperties, FC } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { theme } from "antd";
import clsx from "clsx";

import styles from "./index.module.css";

type Props = {
  collapsed: boolean;
  className?: string;
  dataTestId?: string;
  onClick: (collapsed: boolean) => void;
};

export const SiderTrigger: FC<Props> = ({
  className,
  collapsed,
  dataTestId,
  onClick,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const containerThemeStyles = { "--color": colorBgContainer } as CSSProperties;

  const handleClick = () => {
    onClick(!collapsed);
  };

  return (
    <button
      type="button"
      style={containerThemeStyles}
      className={clsx(className, styles.container)}
      data-testid={dataTestId}
      onClick={handleClick}
    >
      {collapsed ? <RightOutlined /> : <LeftOutlined />}
    </button>
  );
};
