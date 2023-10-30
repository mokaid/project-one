import { type FC, useCallback, useState, useEffect } from "react";
import { AimOutlined, LoadingOutlined } from "@ant-design/icons";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Badge, Empty, Input, Spin } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import clsx from "clsx";
import { ActionList } from "../../components/action-list";
import { GoogleMapControl } from "../../components/google-map-control";
import { Widget } from "../../components/widget";
import { GOOGLE_MAP_API_KEY } from "../../const/google-maps";

import { ALERTS_MAP_CONFIG } from "./config";
import { alerts } from "./mock";

import styles from "./index.module.css";
import { useQueryeventsiteMutation } from "../../services";
import { formatDate, getLastWeekDate } from "../../utils/general-helpers";
import { useNavigate } from "react-router-dom";


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
const navigate = useNavigate()

  const [map, setMap] = useState<google.maps.Map | null>(null);
  useQueryeventsiteMutation;
  const [getAllEvents, { isLoading }] = useQueryeventsiteMutation();
  const [alertData, setAlertData] = useState<[]>([]);
  const date = new Date();
  useEffect(() => {
    const body = {
      startTime: formatDate(getLastWeekDate(date)),
      endTime: formatDate(date),
    };
    (async () => {
      const res = await getAllEvents(body);
      setAlertData(res.data.data.site);
      console.log("Alerts Data", res);
    })();
  }, []);

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const handleMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapCenterClick = () => {
    if (map === null) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    map.panTo(ALERTS_MAP_CONFIG.center!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    map.setZoom(ALERTS_MAP_CONFIG.zoom!);
  };

  return (
    <div className={clsx(className, styles.container)} data-testid={dataTestId}>
      <Widget
        title="Alerts"
        className={styles.alerts}
        contentClassName={styles.content}
        round={false}
      >
        <Search placeholder="Search..." className={"serch_input_map"} />

        <ActionList className={styles.list}>
          {(!isLoading && alertData.length) === 0 ? (
            <div className="loader">
            <Empty />
            </div>
          ) : isLoading ? (
            <div className="loader">
              <Spin
                indicator={
                  <LoadingOutlined style={{ fontSize: 24 }} spin={true} />
                }
              />
            </div>
          ) : (
            <>
              {alertData?.map(({ id, name, count }) => (
                <ActionList.Item key={id} extra={count} onClick={()=>navigate("/alert-map")} >
                  <Badge status="success" /> {name}
                </ActionList.Item>
              ))}
              
            </>
          )}
        </ActionList>
      </Widget>

      <ErrorBoundary>
        {isLoaded && (
          <GoogleMap
            mapContainerClassName={styles.map}
            options={ALERTS_MAP_CONFIG}
            onLoad={handleMapLoad}
            onUnmount={handleMapUnmount}
          >
            <GoogleMapControl
              position={window.google.maps.ControlPosition.RIGHT_BOTTOM}
            >
              <button
                type="button"
                className={styles.mapButton}
                style={{ marginInlineEnd: "6px" }}
                onClick={handleMapCenterClick}
                title="Re-center the map"
                aria-label="Re-center the map"
              >
                <AimOutlined />
              </button>
            </GoogleMapControl>
          </GoogleMap>
        )}
      </ErrorBoundary>
    </div>
  );
};
