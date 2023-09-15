import { type FC } from "react";
import { Switch } from "antd";
import clsx from "clsx";

import {
  closeFullScreen,
  isFullScreen,
  openFullScreen,
} from "../../utils/fullscreen";

import styles from "./index.module.css";

type Props = {
  className?: string;
  dataTestId?: string;
};

export const FullScreenSwitcher: FC<Props> = ({
  className,
  dataTestId = "full-screen-switcher",
}) => {
  const toggleFullScreen = () => {
    if (isFullScreen()) {
      closeFullScreen();
    } else {
      openFullScreen();
    }
  };

  return (
    <div className={clsx(className, styles.container)} data-testid={dataTestId}>
      Full Screen:
      <Switch
        checkedChildren="ON"
        unCheckedChildren="OFF"
        onChange={toggleFullScreen}
        defaultChecked={false}
        data-testid="full-screen-switch"
      />
    </div>
  );
};
