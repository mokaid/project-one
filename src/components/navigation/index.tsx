import { type FC, type ReactNode, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, type MenuProps } from "antd";

import { getItem } from "./utils";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  disabled?: boolean;
  subNav?: NavItem[];
};

type MenuItem = Required<MenuProps>["items"][number];

export type NavigationProps = Pick<MenuProps, "mode"> & {
  items: NavItem[];
  className?: string;
  dataTestId?: string;
};

export const Navigation: FC<NavigationProps> = ({
  mode,
  items,
  className,
  dataTestId,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = useMemo<MenuItem[]>(() => items.map(getItem), [items]);

  const handleSelect: MenuProps["onSelect"] = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      mode={mode}
      onSelect={handleSelect}
      className={className}
      items={navItems}
      selectedKeys={[location.pathname]}
      data-testid={dataTestId}
    />
  );
};
