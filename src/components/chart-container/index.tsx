import type { FC, ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

import { Widget, WidgetProps } from "../widget";

import styles from "./index.module.css";

export type ChartContainerProps = Omit<WidgetProps, "contentClassName">;

export const ChartContainer: FC<ChartContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Widget contentClassName={styles.chart} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children as ReactElement}
      </ResponsiveContainer>
    </Widget>
  );
};
