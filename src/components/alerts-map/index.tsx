import { type FC, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Input, Typography } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import clsx from "clsx";

import { GOOGLE_MAP_API_KEY } from "../../const/google-maps";
import { ActionList } from "../action-list";
import { Widget } from "../widget";

import { ALERTS_MAP_CONFIG } from "./config";
import { alerts } from "./mock";

import styles from "./index.module.css";

type Props = {
  className?: string;
  dataTestId?: string;
};

export const AlertsMap: FC<Props> = ({ className, dataTestId }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const [, setMap] = useState<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const handleMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <Widget
      className={clsx(className, styles.container)}
      dataTestId={dataTestId}
    >
      <div className={styles.content}>
        <div className={styles.alerts}>
          <header className={styles.header}>
            <Typography.Title level={5} className={styles.heading}>
              Alerts Map
            </Typography.Title>
          </header>

          <Input.Search placeholder="Search..." />

          <div className={styles.list}>
            <ActionList>
              {alerts.map(({ id, name, count }) => (
                <ActionList.Item key={id} extra={count}>
                  {name}
                </ActionList.Item>
              ))}
            </ActionList>
          </div>
        </div>

        <ErrorBoundary>
          {isLoaded && (
            <GoogleMap
              mapContainerClassName={styles.map}
              options={ALERTS_MAP_CONFIG}
              onLoad={handleMapLoad}
              onUnmount={handleMapUnmount}
            />
          )}
        </ErrorBoundary>
      </div>
    </Widget>
  );
};
