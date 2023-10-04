import type { FC } from "react";
import { Button, Checkbox, DatePicker, Drawer, Form, Space } from "antd";

import { BaseSelect } from "../../components/base-select";
import { ALARM_LEVEL_OPTIONS } from "../../const/alarm";
import { APP_DATE_TIME_FORMAT } from "../../const/common";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { getShowEventsFilterModalState } from "../../store/selectors/events";
import { setShowEventsFilterModal } from "../../store/slices/events";
import { getCheckboxGroupProps } from "../../utils/form-helpers/get-checkbox-group-props";
import { getDateFromEvent } from "../../utils/form-helpers/get-date-from-event";
import { getDateProps } from "../../utils/form-helpers/get-date-props";
import { getMultipleSelectProps } from "../../utils/form-helpers/get-multiple-select-props";

type Props = {
  dataTestId?: string;
};

type Fields = {
  datetime: string[];
  object: unknown[];
  priority: unknown[];
  site: unknown[];
  type: unknown[];
  value: unknown[];
  vendor: unknown[];
};

const { Item } = Form;
const { RangePicker } = DatePicker;
const initialValues: Fields = {
  datetime: [],
  object: [],
  priority: [],
  site: [],
  type: [],
  value: [],
  vendor: [],
};

export const AlertsSearchFilterDrawer: FC<Props> = ({ dataTestId }) => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(getShowEventsFilterModalState);
  const [form] = Form.useForm<Fields>();

  const handleReset = () => {
    form.resetFields();
  };

  const handleClose = () => {
    dispatch(setShowEventsFilterModal(false));
  };

  const handleSubmit = async (values: Fields) => {
    console.log(values);
  };

  return (
    <Drawer
      open={show}
      width={460}
      title="Alerts Filter"
      extra={
        <Space>
          <Button type="default" onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" onClick={form.submit}>
            Apply
          </Button>
        </Space>
      }
      destroyOnClose={true}
      onClose={handleClose}
      data-testid={dataTestId}
    >
      <Form<Fields>
        form={form}
        layout="vertical"
        name="alerts-search"
        initialValues={initialValues}
        onFinish={handleSubmit}
        data-testid="alerts-search-form"
      >
        <Item<Fields>
          label="Priority"
          name="priority"
          getValueProps={getCheckboxGroupProps}
        >
          <Checkbox.Group options={ALARM_LEVEL_OPTIONS} />
        </Item>
        <Item<Fields>
          label="Site"
          name="site"
          getValueProps={getMultipleSelectProps}
        >
          <BaseSelect
            mode="multiple"
            placeholder="Select Site"
            allowClear={true}
          />
        </Item>
        <Item<Fields>
          label="Date and Time"
          name="datetime"
          getValueFromEvent={getDateFromEvent}
          getValueProps={getDateProps}
        >
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format={APP_DATE_TIME_FORMAT}
          />
        </Item>
        <Item<Fields>
          label="Vendor"
          name="vendor"
          getValueProps={getMultipleSelectProps}
        >
          <BaseSelect
            mode="multiple"
            placeholder="Select Vendor"
            allowClear={true}
          />
        </Item>
        <Item<Fields>
          label="Object"
          name="object"
          getValueProps={getMultipleSelectProps}
        >
          <BaseSelect
            mode="multiple"
            placeholder="Select Object"
            allowClear={true}
          />
        </Item>
        <Item<Fields>
          label="Type"
          name="type"
          getValueProps={getMultipleSelectProps}
        >
          <BaseSelect
            mode="multiple"
            placeholder="Select Type"
            allowClear={true}
          />
        </Item>
        <Item<Fields>
          label="Value"
          name="value"
          getValueProps={getMultipleSelectProps}
        >
          <BaseSelect
            mode="multiple"
            placeholder="Select Value"
            allowClear={true}
          />
        </Item>
      </Form>
    </Drawer>
  );
};
