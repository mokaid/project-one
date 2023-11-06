import type { FC } from "react";
import { Bar, Legend, XAxis, YAxis } from "recharts";

import { BaseBarChart } from "../../charts/base-bar-chart";
import { ChartContainer, ChartContainerProps } from "../../charts/chart-container";

const data = [
  {
    name: "Jan 23",
    low: 4000,
    medium: 2400,
    high: 2400,
  },
  {
    name: "Feb 23",
    low: 3000,
    medium: 1398,
    high: 2210,
  },
  {
    name: "Mar 23",
    low: 2000,
    medium: 9800,
    high: 2290,
  },
  {
    name: "Apr 23",
    low: 2780,
    medium: 3908,
    high: 2000,
  },
  {
    name: "May 23",
    low: 1890,
    medium: 4800,
    high: 2181,
  },
  {
    name: "Jun 23",
    low: 2390,
    medium: 3800,
    high: 2500,
  },
  {
    name: "Jul 23",
    low: 3490,
    medium: 4300,
    high: 2100,
  },
  {
    name: "Aug 23",
    low: 3490,
    medium: 4300,
    high: 2100,
  },
  {
    name: "Sep 23",
    low: 3490,
    medium: 4300,
    high: 2100,
  },
  {
    name: "Oct 23",
    low: 3490,
    medium: 4300,
    high: 2100,
  },
  {
    name: "Nov 23",
    low: 3490,
    medium: 4300,
    high: 2100,
  },
  {
    name: "Dec 23",
    low: 3490,
    medium: 4300,
    high: 2100,
  },
];
type Props = Pick<
  ChartContainerProps,
  "title" | "tooltipText" | "className" | "dataTestId"
> & {
  centerText?: string;
  data?: PieGraphDataType[];
  isLoading?: boolean;
  colors?: string[];
};

const COLORS = ["#5CDB1D", "#FBB62D", "#F63A44"];

export const AlertsByMonth: FC<Props> = ({ className,title,tooltipText,dataTestId}) => {
  return (
    <ChartContainer
      className={className}
      title={title}
      tooltipText={tooltipText}
      dataTestId={dataTestId}
    >
      <BaseBarChart data={data}>
        <XAxis width={50} dataKey="name" />
        <YAxis />
        <Legend />
        <Bar width={10} dataKey="low" stackId="a" fill={COLORS[1]} />
        <Bar width={10} dataKey="medium" stackId="a" fill={COLORS[0]} />
        <Bar width={10} dataKey="high" stackId="a" fill={COLORS[2]} />
      </BaseBarChart>
    </ChartContainer>
  );
};
