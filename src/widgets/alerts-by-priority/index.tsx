import type { FC } from "react";

import { BasePieChart } from "../../charts/base-pie-chart";
import {
  ChartContainer,
  type ChartContainerProps,
} from "../../charts/chart-container";

type Props = Pick<
  ChartContainerProps,
  "title" | "tooltipText" | "className" | "dataTestId"
>;

const data = [
  { name: "Low", value: 400 },
  { name: "Medium", value: 100 },
  { name: "High", value: 30 },
];

const COLORS = ["#5CDB1D", "#FBB62D", "#F63A44"];

export const AlertsByPriority: FC<Props> = ({
  className,
  title,
  tooltipText,
  dataTestId,
}) => {
  return (
    <ChartContainer
      className={className}
      title={title}
      tooltipText={tooltipText}
      dataTestId={dataTestId}
    >
      <BasePieChart data={data} colors={COLORS} dataKey="value" />
    </ChartContainer>
  );
};
