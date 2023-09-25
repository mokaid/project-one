import type { FC } from "react";
import { Bar, Legend, XAxis, YAxis } from "recharts";

import { BaseBarChart } from "../../charts/base-bar-chart";
import { ChartContainer } from "../../charts/chart-container";

const data = [
  {
    name: "Page A",
    low: 4000,
    medium: 2400,
    high: 2400,
  },
  {
    name: "Page B",
    low: 3000,
    medium: 1398,
    high: 2210,
  },
  {
    name: "Page C",
    low: 2000,
    medium: 9800,
    high: 2290,
  },
  {
    name: "Page D",
    low: 2780,
    medium: 3908,
    high: 2000,
  },
  {
    name: "Page E",
    low: 1890,
    medium: 4800,
    high: 2181,
  },
  {
    name: "Page F",
    low: 2390,
    medium: 3800,
    high: 2500,
  },
  {
    name: "Page G",
    low: 3490,
    medium: 4300,
    high: 2100,
  },
];

const COLORS = ["#5CDB1D", "#FBB62D", "#F63A44"];

export const AlertsByMonth: FC = () => {
  return (
    <ChartContainer>
      <BaseBarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Bar width={10} dataKey="low" stackId="a" fill={COLORS[1]} />
        <Bar width={10} dataKey="medium" stackId="a" fill={COLORS[0]} />
        <Bar width={10} dataKey="high" stackId="a" fill={COLORS[2]} />
      </BaseBarChart>
    </ChartContainer>
  );
};
