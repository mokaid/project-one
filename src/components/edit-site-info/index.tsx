import { type FC, useMemo } from "react";

import { DescriptionList, DescriptionListItem } from "../../description-list";
import { DeviceEvent } from "../../types/device-event";
import { StatusLevelTag } from "../status-level-tag";
import { Button, Card, Form, Input, Space, Tag } from "antd";
import styles from "./index.module.css";
import { RedoOutlined } from "@ant-design/icons";

type Props = {
  site?: DeviceEvent["site"];
  className?: string;
  dataTestId?: string;
};
const { Item } = Form;
export const EditSiteInfo: FC<Props> = ({
  site,
  className,
  dataTestId,
  data,
}) => {
  // TODO: Get rest info from BE
  const items = useMemo<DescriptionListItem[]>(
    () => [
      { label: "Box Type", value: "sbox-linux" },
      {
        label: "Status",
        value: (
          <>
            {" "}
            <StatusLevelTag level={5} />{" "}
            <Space size="small">
              <Tag style={{ background: "transparent" }}>Reboot App</Tag>
            </Space>
          </>
        ),
      },
      { label: "Last Firmware Version", value: "N/A" },
      { label: "Current Firmware Version", value: "1.1.11" },
      { label: "Os Version", value: "N/A" },
      {
        label: "Custom I/O Alarm Text",
        value: (
          <Button
            type="default"
            style={{
              background: "transparent",
              borderRadius: "1px",
              borderColor: "#1B3687",
            }}
          >
            Apply IO Alarm Text
          </Button>
        ),
      },
    ],
    [site],
  );
  const maskeditems = useMemo<DescriptionListItem[]>(
    () => [
      { label: "Site ID", value: "0100098" },
      { label: "Source ID", value: "N/A" },
      { label: "Ignore ID", value: "N/A" },
      { label: "Item Key", value: "N/A" },
    ],
    [site],
  );
  return (
    <>
      <DescriptionList
        className={className}
        // title="Site Info"
        items={data ? data : items}
        dataTestId={dataTestId}
      />
      <ContactCard />
      <DescriptionList
        className={className}
        title="Masked Source"
        items={data ? data : maskeditems}
        dataTestId={dataTestId}
      />
      <Button
          type="default"
          // onClick={handleReset}
          style={{
            background: "transparent",
            borderRadius: "1px",
            borderColor: "#1B3687",
            width: "100%",
          }}
          icon={<RedoOutlined />}
         
        >
          Recovery
        </Button>
    </>
  );
};

const ContactCard = ({ index }: { index?: number }) => {
  return (
    <>
      <Card className="contact_card" style={{marginBottom:"1rem"}}>
        <Item label="IO" name="remarks">
          <Input placeholder="0" className={styles.input_bg} type="number" />
        </Item>
        <Item label="Alarm Text" name="remarks">
          <Input
            placeholder="Type here..."
            className={styles.input_bg}
            />
        </Item>
      </Card>
    </>
  );
};
