import { memo } from "react";
import { theme } from "antd";
import clsx from "clsx";

import { ReactComponent as LogoImage } from "./assets/logo.svg";

import styles from "./index.module.css";

type Props = {
  className?: string;
  collapsed?: boolean;
};

export const Logo = memo<Props>(({ className, collapsed = false }) => {
  const {
    token: { colorText, motionEaseInOut },
  } = theme.useToken();

  return (
    <div
      className={clsx(className, styles.container)}
      style={{ color: colorText, transitionTimingFunction: motionEaseInOut }}
    >
      <LogoImage
        className={clsx(styles.logo, { [styles.collapsed]: collapsed })}
      />
    </div>
  );
});
