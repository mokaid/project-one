import { type FC, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Input } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import clsx from "clsx";

import { ActionList } from "../../components/action-list";
import { Widget } from "../../components/widget";
import { GOOGLE_MAP_API_KEY } from "../../const/google-maps";

import { ALERTS_MAP_CONFIG } from "./config";
import { alerts } from "./mock";

import styles from "./index.module.css";

type Props = {
  className?: string;
  dataTestId?: string;
};

const { Search } = Input;

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
    <div className={clsx(className, styles.container)} data-testid={dataTestId}>
      <Widget
        title="Alerts Map"
        className={styles.alerts}
        contentClassName={styles.content}
        round={false}
      >
        <Search placeholder="Search..." />

        <ActionList className={styles.list}>
          {alerts.map(({ id, name, count }) => (
            <ActionList.Item key={id} extra={count}>
              {name}
            </ActionList.Item>
          ))}
        </ActionList>
      </Widget>

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
  );
};
