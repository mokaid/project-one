import { Button, Drawer, Form, Input, Space, Typography } from "antd";
import { type FC, useState } from "react";

import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { BaseSelect } from "../../components/base-select";
import styles from "./index.module.css";

type Props = {
  dataTestId?: string;
  alarmRecord?: boolean;
  Show: boolean;
  setAddGroup: React.Dispatch<React.SetStateAction<boolean>>;
};

type Fields = {
  organization: string[];
  sitename: string;
  boxtype: string[];
  organizationname: string;
};

const { Item } = Form;
const { TextArea } = Input;
const initialValues: Fields = {
  organization: [],
  sitename: "",
  boxtype: [],
  organizationname: "",
};

export const AddGroupModal: FC<Props> = ({ dataTestId, Show, setAddGroup }) => {
  const show = Show;
  const [form] = Form.useForm<Fields>();

  const handleClose = () => {
    setAddGroup(false);
  };

  const handleSubmit = () => {
    setAddGroup(!Show);
  };

  return (
    <Drawer
      open={show}
      width={460}
      title="Add New Group"
      onClose={handleClose}
      data-testid={dataTestId}
      extra={
        <Space>
          <Button
            type="default"
            style={{
              background: "transparent",
              borderRadius: "1px",
              borderColor: "#1B3687",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            style={{
              borderRadius: "1px",
            }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Space>
      }
      style={{ background: "#0C183B" }}
    >
      <Form<Fields>
        // form={form}
        layout="vertical"
        name="alerts-search"
        initialValues={initialValues}
        // onFinish={handleSubmit}
        data-testid="alerts-search-form"
      >
        <Item<Fields> label="Organization" name="organization">
          <BaseSelect
            mode="multiple"
            placeholder="Select"
            allowClear={true}
            // options={siteOptions}
            className="select_input"
          />
        </Item>
        <Item<Fields> label="Site Name" name="sitename">
          <Input placeholder="Type here..." className={styles.input_bg} />
        </Item>

        <Item<Fields> label="Parent Group" name="organization">
          <BaseSelect
            mode="multiple"
            placeholder="Select"
            allowClear={true}
            // options={siteOptions}
            className="select_input"
          />
        </Item>
      </Form>
    </Drawer>
  );
};
