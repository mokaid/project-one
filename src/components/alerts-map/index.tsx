import { type FC, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Typography } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import clsx from "clsx";

import { GOOGLE_MAP_API_KEY } from "../../const/google-maps";
import { Widget } from "../widget";

import { ALERTS_MAP_CONFIG } from "./config";

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
        <div>
          <Typography.Title level={5}>Alerts Map</Typography.Title>
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
