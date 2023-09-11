import type { FC } from "react";
import { Avatar, type AvatarProps } from "antd";

type Props = Exclude<AvatarProps, "children" | "style"> & {
  userName: string;
};

const colorsList = [
  "#D4380D",
  "#096DD9",
  "#D46B08",
  "#D4B106",
  "#7CB305",
  "#08979C",
  "#1D39C4",
  "#531DAB",
  "#C41D7F",
];

export const UserAvatar: FC<Props> = ({ userName, style, ...props }) => {
  const bgColorIndex = userName.length % colorsList.length;

  return (
    <Avatar
      {...props}
      style={{
        ...style,
        backgroundColor: colorsList[bgColorIndex],
      }}
    >
      {userName.charAt(0).toUpperCase()}
    </Avatar>
  );
};
