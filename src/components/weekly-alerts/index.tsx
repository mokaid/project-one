import type { FC } from "react";

import { ActionList } from "../action-list";
import { Widget } from "../widget";

import { alerts } from "./mock";

type Props = {
  className?: string;
  dataTestId?: string;
};

export const WeeklyAlerts: FC<Props> = ({ className, dataTestId }) => {
  return (
    <Widget
      className={className}
      title="This Week Alerts"
      tooltipText="TODO: Add tooltip text"
      dataTestId={dataTestId}
    >
      <ActionList>
        {alerts.map(({ id, name, count }) => (
          <ActionList.Item key={id} extra={count}>
            {name}
          </ActionList.Item>
        ))}
      </ActionList>
    </Widget>
  );
};
