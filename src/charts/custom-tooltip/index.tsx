/* eslint-disable react/destructuring-assignment */
import { CSSProperties, FC, Fragment } from "react";
import { theme, Typography } from "antd";
import { ContentType } from "recharts/types/component/Tooltip";

type TooltipContentType = ContentType<
  number | string | Array<number | string>,
  string
>;

type RenderTooltipParams<T extends TooltipContentType = TooltipContentType> =
  T extends (...args: infer P) => void ? P[number] : never;

type Props = RenderTooltipParams;

const { Text } = Typography;

export const CustomTooltip: FC<Props> = (props) => {
  const {
    token: { colorBgElevated, boxShadowSecondary, borderRadiusSM, paddingXS },
  } = theme.useToken();

  const themedStyles: CSSProperties = {
    backgroundColor: colorBgElevated,
    padding: paddingXS,
    boxShadow: boxShadowSecondary,
    borderRadius: borderRadiusSM,
  };

  if (props.active && props.payload && props.payload.length) {
    return (
      <div style={themedStyles}>
        {props.payload.map(({ payload }) => {
          const { name, value } = payload;

          return (
            <Fragment key={`${name}-${value}`}>
              <Text>{name}</Text>
              <Text strong={true}>: {value}</Text>
            </Fragment>
          );
        })}
      </div>
    );
  }

  return null;
};
