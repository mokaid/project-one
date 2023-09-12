import type { CSSProperties, FC, PropsWithChildren, ReactNode } from "react";
import { theme } from "antd";
import clsx from "clsx";

import styles from "./index.module.css";

const { useToken } = theme;

export type WidgetProps = PropsWithChildren<{
  className?: string;
  title?: ReactNode;
  headerClassName?: string;
  dataTestId?: string;
}>;

export const Widget: FC<WidgetProps> = ({
  className,
  title,
  children,
  headerClassName,
  dataTestId,
}) => {
  const { token } = useToken();

  const themeStyle: CSSProperties = {
    color: token.colorText,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <section
      style={themeStyle}
      className={clsx(className, styles.container)}
      data-testid={dataTestId}
    >
      {title && (
        <header className={clsx(styles.header, headerClassName)}>
          {title}
        </header>
      )}

      {children}
    </section>
  );
};
