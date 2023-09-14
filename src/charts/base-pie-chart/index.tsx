import { type FC } from "react";
import { theme } from "antd";
import { Cell, Legend, Pie, PieChart, type PieProps, Tooltip } from "recharts";

import { CustomLegend } from "../custom-legend";

export type BasePieChartProps = Pick<PieProps, "data" | "dataKey"> & {
  colors: string[];
  width?: number;
  height?: number;
};

export const BasePieChart: FC<BasePieChartProps> = ({
  colors = [],
  data = [],
  dataKey,
  width,
  height,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        dataKey={dataKey}
        stroke={colorBgContainer}
        cornerRadius={5}
        startAngle={90}
        endAngle={480}
      >
        {data.map((_entry, index) => {
          const key = `cell-${index}`;

          return <Cell key={key} fill={colors[index % colors.length]} />;
        })}
      </Pie>

      <Legend align="center" content={<CustomLegend />} />

      <Tooltip />
    </PieChart>
  );
};
