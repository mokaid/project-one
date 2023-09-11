import { type FC, useContext } from "react";
import { Switch } from "antd";
import clsx from "clsx";

import { ThemeContext } from "../../theme";

import styles from "./index.module.css";

type Props = {
  className?: string;
  dataTestId?: string;
};

export const ThemeSwitcher: FC<Props> = ({
  className,
  dataTestId = "theme-switcher",
}) => {
  const { appTheme, toggleAppTheme } = useContext(ThemeContext);

  return (
    <div className={clsx(className, styles.container)} data-testid={dataTestId}>
      Dark Mode:
      <Switch
        checkedChildren="ON"
        unCheckedChildren="OFF"
        onChange={toggleAppTheme}
        defaultChecked={appTheme === "dark"}
        data-testid="theme-switch"
      />
    </div>
  );
};
