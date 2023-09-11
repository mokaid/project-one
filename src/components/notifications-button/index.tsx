import type { FC } from "react";
import { Link } from "react-router-dom";
import { NotificationOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import clsx from "clsx";

import { AppRoute } from "../../routes/routes";

import styles from "./index.module.css";

type Props = {
  className?: string;
  dataTestId?: string;
};

export const NotificationsButton: FC<Props> = ({ className, dataTestId }) => {
  const count = 1;

  return (
    <Link
      className={clsx(className, styles.container)}
      to={AppRoute.Notifications}
      data-testid={dataTestId}
    >
      <Badge size="small" dot={count > 0}>
        <NotificationOutlined className={styles.icon} onClick={() => {}} />
      </Badge>
    </Link>
  );
};
