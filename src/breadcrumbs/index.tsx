import type { FC } from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, type BreadcrumbProps } from "antd";

import { useBreadcrumbs } from "../hooks/use-breadcrumbs";

type Props = {
  className?: string;
};

const itemRender: BreadcrumbProps["itemRender"] = (route, _params, items) => {
  const last = items.indexOf(route) === items.length - 1;
  const first = items.indexOf(route) === 0;

  return last ? (
    <span>{route.title}</span>
  ) : (
    <Link to={route.href!}>{first ? <HomeOutlined /> : route.title}</Link>
  );
};

export const Breadcrumbs: FC<Props> = ({ className }) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb
      className={className}
      items={breadcrumbs}
      itemRender={itemRender}
      data-testid="page-breadcrumbs"
    />
  );
};
