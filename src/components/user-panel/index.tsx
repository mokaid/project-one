import { type FC, useState } from "react";
import { List, Popover } from "antd";

import { UserAvatar } from "../user-avatar";

import styles from "./index.module.css";

export const UserPanel: FC = () => {
  const [open, setOpen] = useState(false);
  const userName = "userName";

  const togglePopover = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Popover
      open={open}
      placement="bottomRight"
      trigger="click"
      showArrow={false}
      onOpenChange={togglePopover}
      content={
        <List size="small">
          <List.Item>TODO</List.Item>
          <List.Item>TODO</List.Item>
          <List.Item>TODO</List.Item>
          <List.Item>TODO</List.Item>
        </List>
      }
      arrow={false}
    >
      <UserAvatar
        size={32}
        className={styles.avatar}
        userName={userName}
        aria-label={open ? "Hide user menu" : "Show user menu"}
      />
    </Popover>
  );
};
