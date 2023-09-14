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
  { name: "Dubai Police", value: 40 },
  { name: "Dubai Hills Mall", value: 400 },
  { name: "Dubai Mall", value: 26 },
  { name: "RTA", value: 246 },
  { name: "Dubai Metro", value: 5 },
  { name: "Burj Al Arab", value: 115 },
  { name: "Mall of Emirates", value: 78 },
  { name: "Dubai Opera", value: 37 },
  { name: "MOFA", value: 48 },
  { name: "Museum of Future", value: 45 },
];

const COLORS = [
  "#13C2C2",
  "#FA8C16",
  "#FADB14",
  "#A0D911",
  "#FA541C",
  "#1890FF",
  "#2F54EB",
  "#9254DE",
  "#EB2F96",
  "#F5222D",
];

export const TopAlertsBySite: FC<Props> = ({
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
