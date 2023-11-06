import {useState, useEffect, type FC } from "react";
import { Col, Row } from "antd";

import { AlertsByMonth } from "../../widgets/alerts-by-month";
import { AlertsByPriority } from "../../widgets/alerts-by-priority";
import { AlertsByType, TopAlertsByType } from "../../widgets/alerts-by-type";
import { TopAlertsBySite } from "../../widgets/top-alerts-by-site";

import styles from "./index.module.css";
import { useGetAllEventsMutation } from "../../services";
import { formatDate, getLastWeekDate } from "../../utils/general-helpers";
import { DeviceEvent } from "../../types/device-event";
import { HorizontalBarGraphDataType, PieGraphDataType } from "../../types/graph-data";
import {
  priorityChartColors,
  siteChartBarColor,
  systemChartColors,
  weeklyAlertChartBarColor,
} from "../../utils/constants";

export const AlarmRecordCharts: FC = () => {
  const [getAllEvents, { isLoading }] = useGetAllEventsMutation();
  const [allWeeklyAlerts, setAllWeeklyAlerts] = useState<
    HorizontalBarGraphDataType[]
  >([]);
  const [weeklyAlertsbyPriority, setWeeklyAlertsbyPriority] = useState<
    PieGraphDataType[]
  >([]);
  const [weeklyAlertsbySystem, setWeeklyAlertsbySystem] = useState<
    PieGraphDataType[]
  >([]);
  const [weeklyAlertsbyDevices, setWeeklyAlertsbyDevices] = useState<
    PieGraphDataType[]
  >([]);
  const [weeklyTopAlertsBySite, setWeeklyTopAlertsBySite] = useState<
    HorizontalBarGraphDataType[]
  >([]);


  const [totalWeeklyAlerts, setTotalWeeklyAlerts] = useState<Number>(0);

  
  
  
  const date = new Date();

  const setDataIntoStates=(data: DeviceEvent[])=>{
    setTotalWeeklyAlerts(data.length);
    let weeklyAlerts: HorizontalBarGraphDataType[] = [];
    let vendors: PieGraphDataType[] = [];
    let devices: PieGraphDataType[] = [];
    let sites: HorizontalBarGraphDataType[] = [];
    let count = { low: 0, medium: 0, high: 0 };


    data.forEach((ev: DeviceEvent) => {
      if (ev.level > 3) {
        count.high = count.high + 1;
      } else if (ev.level < 3) {
        count.low = count.low + 1;
      } else {
        count.medium = count.medium + 1;
      }
      const findVendor = vendors.find((item) => item.name === ev.vendor);
      if (!findVendor) {
        vendors.push({ name: ev.vendor, value: 1 });
      } else {
        let newVendors = vendors.filter((item) => item.name !== ev.vendor);
        vendors = [
          ...newVendors,
          { name: ev.vendor, value: findVendor.value + 1 },
        ];
      }
      const findDevice = devices.find((item) => item.name === ev.obj.name);
      if (!findDevice) {
        devices.push({ name: ev.obj.name, value: 1 });
      } else {
        let newVendors = devices.filter((item) => item.name !== ev.obj.name);
        devices = [
          ...newVendors,
          { name: ev.obj.name, value: findDevice.value + 1 },
        ];
      }

      const findSite = sites.find((item) => item.name === ev.site.name);
      if (!findSite) {
        sites.push({ name: ev.site.name, count: 1 });
      } else {
        let newsites = sites.filter((item) => item.name !== ev.site.name);
        sites = [
          ...newsites,
          { name: ev.site.name, count: findSite.count + 1 },
        ];
      }

      const findAlert = weeklyAlerts.find((item) => item.name === ev.obj.key);
      if (!findAlert) {
        weeklyAlerts.push({ name: ev.obj.key, count: 1 });
      } else {
        let newweeklyAlerts = weeklyAlerts.filter(
          (item) => item.name !== ev.obj.key,
        );
        weeklyAlerts = [
          ...newweeklyAlerts,
          { name: ev.obj.key, count: findAlert.count + 1 },
        ];
      }
      
    })
    setAllWeeklyAlerts(
      weeklyAlerts.map((item, ind) => ({
        ...item,
        xAxisValue: Math.ceil((1000 / weeklyAlerts.length) * (ind + 1)),
      })),
    );
    setWeeklyAlertsbyPriority([
      { name: "Low", value: count.low },
      { name: "Medium", value: count.medium },
      { name: "High", value: count.high },
    ]);
    setWeeklyAlertsbySystem(vendors);
    setWeeklyAlertsbyDevices(devices);
    setWeeklyTopAlertsBySite(
      sites.map((item, ind) => ({
        ...item,
        xAxisValue: Math.ceil((1000 / sites.length) * (ind + 1)),
      })),
    );

    
  }
  
  
  useEffect(() => {
    const body = {
      startTime: formatDate(getLastWeekDate(date)),
      endTime: formatDate(date),
    };
    (async () => {
      const res = await getAllEvents(body);
      setDataIntoStates(res?.data?.data.event);
      console.log("res",res?.data?.data.event)
    })();
  }, []);

  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <TopAlertsByType
          title="Alerts by Event Type"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="all-weekly-alerts"
          color={weeklyAlertChartBarColor}
          data={allWeeklyAlerts}
          isLoading={isLoading}
        />
      </Col>
      <Col span={8}>
        <AlertsByPriority
          title="Weekly Alerts by Priority"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="weekly-priority-alerts-chart"
          centerText={totalWeeklyAlerts.toString()}
          data={weeklyAlertsbyPriority}
          isLoading={isLoading}
          colors={priorityChartColors}
        />
      </Col>
      <Col span={8}>
        <AlertsByMonth title="Alerts by Month"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="weekly-alerts-by-month" />
      </Col>
      <Col span={8}><AlertsByPriority
          title="Alerts by System"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="weekly-alerts-by-system"
          centerText={totalWeeklyAlerts.toString()}
          data={weeklyAlertsbySystem}
          isLoading={isLoading}
          colors={
            weeklyAlertsbySystem.length <= systemChartColors.length
              ? systemChartColors
              : systemChartColors
          }
        /></Col>
      <Col span={8}>
      <TopAlertsBySite
          title="Top 10 Weekly Alerts by Site"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="top-10-alerts-by-site-chart"
          color={siteChartBarColor}
          data={weeklyTopAlertsBySite}
          isLoading={isLoading}
        />
      </Col>
      <Col span={8}><AlertsByPriority
          title="Alerts by Devices"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="weekly-alerts-by-system"
          centerText={totalWeeklyAlerts.toString()}
          data={weeklyAlertsbyDevices}
          isLoading={isLoading}
          colors={
            weeklyAlertsbyDevices.length <= systemChartColors.length
              ? systemChartColors
              : systemChartColors
          }
        /></Col>
    </Row>
  );
};
