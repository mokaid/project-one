import { type FC, useCallback } from "react";
import { theme } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ContentType } from "recharts/types/component/Label";

import {
  ChartContainer,
  type ChartContainerProps,
} from "../../charts/chart-container";

type Props = Pick<
  ChartContainerProps,
  "title" | "tooltipText" | "className" | "dataTestId"
>;

const data = [
  { name: "Dubai Police", value: 400 },
  { name: "Dubai Hills Mall", value: 380 },
  { name: "Dubai Mall", value: 246 },
  { name: "RTA", value: 214 },
  { name: "Dubai Metro", value: 198 },
  { name: "Burj Al Arab", value: 175 },
  { name: "Mall of Emirates", value: 130 },
  { name: "Dubai Opera", value: 121 },
  { name: "MOFA", value: 100 },
  { name: "Museum of Future", value: 44 },
];

type RenderLabelParams<T extends ContentType> = T extends (
  ...args: infer P
) => void
  ? P[number]
  : never;

export const TopAlertsBySite: FC<Props> = ({
  className,
  title,
  tooltipText,
  dataTestId,
}) => {
  const {
    token: { colorText, colorBorder, colorError, ...token },
  } = theme.useToken();

  const renderLabel = useCallback(
    (props: RenderLabelParams<ContentType>) => {
      const { value, y, height } = props;

      return (
        <text
          x={16}
          y={Number(y) + Number(height) / 2}
          fill={colorText}
          dominantBaseline="middle"
        >
          {value}
        </text>
      );
    },
    [colorText],
  );

  return (
    <ChartContainer
      className={className}
      title={title}
      tooltipText={tooltipText}
      dataTestId={dataTestId}
    >
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <CartesianGrid stroke={colorBorder} />
        <XAxis type="number" />
        <YAxis hide={true} dataKey="name" type="category" scale="auto" />
        <Tooltip cursor={false} />

        <Bar dataKey="value" barSize={16} fill={token["geekblue-3"]}>
          <LabelList
            dataKey="name"
            position="insideLeft"
            fill="white"
            content={renderLabel}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
