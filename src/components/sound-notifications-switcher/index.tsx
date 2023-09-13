import type { FC } from "react";
import { Switch } from "antd";
import clsx from "clsx";

import styles from "./index.module.css";

type Props = {
  className?: string;
  dataTestId?: string;
};

export const SoundNotificationsSwitcher: FC<Props> = ({
  className,
  dataTestId = "sound-notifications-switcher",
}) => {
  return (
    <div className={clsx(className, styles.container)} data-testid={dataTestId}>
      Sound:
      <Switch
        checkedChildren="ON"
        unCheckedChildren="OFF"
        data-testid="sound-notifications-switch"
      />
    </div>
  );
};
