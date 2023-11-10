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
  left?:boolean
};

export const SiderTrigger: FC<Props> = ({
  className,
  collapsed,
  dataTestId,
  onClick,
  left
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const containerThemeStyles = { "--color": colorBgContainer } as CSSProperties;
  const transform = left ? 'rotate(180deg)' : 'rotate(0deg)';

  const handleClick = () => {
    onClick(!collapsed);
  };

  return (
    <button
      type="button"
      style={containerThemeStyles}
      className={clsx(className, `${styles.container} ${left ? styles.bg_dark : styles.common_bg_dark}`)}
      onClick={handleClick}
      aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
      data-testid={dataTestId}
    >
      {collapsed  ? <RightOutlined style={{transform:transform}} /> : <LeftOutlined style={{transform:transform}} />}
    </button>
  );
};
