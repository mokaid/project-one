import { useState, type FC } from "react";
import { Button, Drawer, Form, Input, Radio, Space, Spin, message } from "antd";
import { useDidUpdate } from "rooks";

import { AlarmInfoList } from "../../alarm-info-list";
import { SiteInfoList } from "../../components/site-info-list";
import { DescriptionList } from "../../description-list";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import {
  getSelectedEvents,
  getShowProcessAlarmModalState,
  getShowSiteInfoModalState,
} from "../../store/selectors/events";
import {
  setSelectedEvents,
  setShowProcesslarmModal,
  setShowSiteInfoModal,
} from "../../store/slices/events";
import { DeviceEvent, ProcessStatus } from "../../types/device-event";
import { getFormattedDateTime } from "../../utils/get-formatted-date-time";

import styles from "./index.module.css";
import { useProcessEventMutation } from "../../services";
import { ReqProcessEvent } from "../../types/process-event";
import { LoadingOutlined } from "@ant-design/icons";
import { SiteInfoListMap } from "../../components/site-info-map-list";

type Props = {
  dataTestId?: string;
};

type Fields = {
  processStatus: ProcessStatus;
  remarks: string;
  caseNumber: string;
};

const initialValues: Fields = {
  processStatus: ProcessStatus.Accomplished,
  remarks: "",
  caseNumber: "",
};

const { Item } = Form;
const { TextArea } = Input;

const processStatusOptions = [
  { label: "Pending", value: ProcessStatus.Pending },
  { label: "Dispatched", value: ProcessStatus.Dispatched },
  { label: "Accomplished", value: ProcessStatus.Accomplished },
];

export const SiteInfoModal: FC<Props> = ({ dataTestId }) => {
  const [handleProcessEvents, {}] = useProcessEventMutation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<Fields>();
  const show = useAppSelector(getShowSiteInfoModalState);
  const [event] = useAppSelector(getSelectedEvents);
  const processTime = event ? getFormattedDateTime(event.process.time) : "N/A";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClose = () => {
    dispatch(setShowSiteInfoModal(false));
    dispatch(setSelectedEvents([]));
  };

  useDidUpdate(() => {
    if (typeof event === "undefined") {
      return;
    }

    const { status, caseNum } = event.process;

    form.setFieldsValue({
      processStatus: status,
      caseNumber: caseNum,
    });
  }, [event]);
  const onSubmit = async () => {
    setIsLoading(true);
    const { caseNumber, processStatus, remarks } = form.getFieldsValue();
    const eventIds: any = [];
    eventIds.push(...eventIds, event.eventId);
    const body: ReqProcessEvent = {
      event: eventIds,
      processStatus,
      caseNumber: caseNumber,
      remarks: remarks,
    };
    const res = await handleProcessEvents(body);
    if (res) {
      setIsLoading(false);
      dispatch(setShowProcesslarmModal(false));
      if (res.data.error === 0) {
        messageApi.open({
          type: "success",
          content: "Process status updated",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Process status update failed",
        });
      }
    }
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: "16px", color: "white" }} spin />
  );

  return (
    <>
      {contextHolder}
      <Drawer
        open={show}
        width={460}
        title="Site Info"
        destroyOnClose={true}
        onClose={handleClose}
        data-testid={dataTestId}
        style={{ background: " #0C183B" }}
      >
        <div className={styles.container}>
          
            <>
              <SiteInfoListMap site={event?.site} />
            </>
                  </div>
      </Drawer>
    </>
  );
};
