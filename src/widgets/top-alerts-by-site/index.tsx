import { type FC, useCallback } from "react";
import { theme } from "antd";
import { Bar, LabelList, XAxis, YAxis } from "recharts";
import { ContentType } from "recharts/types/component/Label";

import { BaseBarChart } from "../../charts/base-bar-chart";
import {
  ChartContainer,
  type ChartContainerProps,
} from "../../charts/chart-container";

import { data } from "./mock";

type Props = Pick<
  ChartContainerProps,
  "title" | "tooltipText" | "className" | "dataTestId"
>;

type RenderLabelParams<T extends ContentType = ContentType> = T extends (
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
    token: { colorText, geekblue3 },
  } = theme.useToken();

  const renderLabel = useCallback(
    (props: RenderLabelParams) => {
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
      <BaseBarChart layout="vertical" data={data}>
        <XAxis type="number" />
        <YAxis hide={true} dataKey="name" type="category" scale="auto" />

        <Bar dataKey="count" barSize={16} fill={geekblue3}>
          <LabelList
            dataKey="name"
            position="insideLeft"
            fill="white"
            content={renderLabel}
          />
        </Bar>
      </BaseBarChart>
    </ChartContainer>
  );
};
