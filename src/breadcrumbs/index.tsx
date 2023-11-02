import type { FC } from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, type BreadcrumbProps } from "antd";

import { useBreadcrumbs } from "../hooks/use-breadcrumbs";
import { clearAllSelectEvents } from "../store/slices/events";
import { useDispatch } from "react-redux";

type Props = {
  className?: string;
};

const itemRender: BreadcrumbProps["itemRender"] = (
  route,
  _params,
  items,
  handleBreadcrumbClick,
) => {
  const last = items.indexOf(route) === items.length - 1;
  const first = items.indexOf(route) === 0;

  return last ? (
    <span>{route.title}</span>
  ) : (
    // <Link to={route.href!}>{first ? <HomeOutlined /> : route.title}</Link>
    <Link to={route.href!} onClick={handleBreadcrumbClick}>
      {first ? "Home" : route.title}
    </Link>
  );
};

export const Breadcrumbs: FC<Props> = ({ className }) => {
  const breadcrumbs = useBreadcrumbs();
  const dispatch = useDispatch();
  const handleBreadcrumbClick = () => {
    dispatch(clearAllSelectEvents());
  };

  return (
    <Breadcrumb
      className={className}
      items={breadcrumbs}
      itemRender={(route, _params, items) =>
        itemRender(route, _params, items, handleBreadcrumbClick)
      }
      data-testid="page-breadcrumbs"
    />
  );
};
