import type { FC } from "react";

import { ActionList } from "../../components/action-list";
import { Widget, type WidgetProps } from "../../components/widget";

import { alerts } from "./mock";

type Props = Pick<
  WidgetProps,
  "title" | "tooltipText" | "className" | "dataTestId"
>;

export const AlertsByType: FC<Props> = ({
  title,
  tooltipText,
  className,
  dataTestId,
}) => {
  // TODO: Get data
  return (
    <Widget
      className={className}
      title={title}
      tooltipText={tooltipText}
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
