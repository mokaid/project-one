import type { FC } from "react";
import { Button, Drawer, Form, Input, Radio, Space } from "antd";
import { useDidUpdate } from "rooks";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import {
  getSelectedEvents,
  getShowProcessAlarmModalState,
} from "../../store/selectors/events";
import {
  setSelectedEvents,
  setShowProcesslarmModal,
} from "../../store/slices/events";
import { ProcessStatus } from "../../types/device-event";
import { getFormattedDateTime } from "../../utils/get-formatted-date-time";

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

export const ProcessAlarmModal: FC<Props> = ({ dataTestId }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<Fields>();
  const show = useAppSelector(getShowProcessAlarmModalState);
  const [event] = useAppSelector(getSelectedEvents);

  const processTime = event ? getFormattedDateTime(event.process.time) : "N/A";

  const handleClose = () => {
    dispatch(setShowProcesslarmModal(false));
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

  return (
    <Drawer
      open={show}
      width={460}
      title="Process Alarm"
      extra={
        <Space>
          <Button type="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="primary" onClick={form.submit}>
            Process
          </Button>
        </Space>
      }
      destroyOnClose={true}
      onClose={handleClose}
      data-testid={dataTestId}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        name="process-alarm"
      >
        <Item label="Last Process Time">{processTime}</Item>
        <Item label="Status" name="processStatus">
          <Radio.Group options={processStatusOptions} />
        </Item>
        <Item label="Case Number" name="caseNumber">
          <Input maxLength={32} placeholder="Netsuite Case Number" />
        </Item>
        <Item label="Notes" name="notes">
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            maxLength={256}
            showCount={true}
            placeholder="Process notes"
          />
        </Item>
      </Form>
    </Drawer>
  );
};
