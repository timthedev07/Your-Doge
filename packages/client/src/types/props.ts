import { MouseEventHandler } from "react";
import { SubjectsQuery } from "../generated/graphql";
import { Homework } from "../generated/sub-graphql";
import { AvatarKeyType, TabData } from "./types";

export interface AlertProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  text: string;
  type: "warning" | "success" | "info";
  onClose?: () => void;
}

export interface CloseButtonProps {
  handleClick: () => void;
}

export interface ProfileProps {
  avatarId: AvatarKeyType;
  username: string;
  email: string;
  bio: string;
  age: number;
  avatarIdSetter: React.Dispatch<React.SetStateAction<number>>;
}

export interface ReadOnlyProfileProps {
  avatarId: AvatarKeyType;
  username: string;
  email: string;
  bio: string;
  age: number;
}

export interface SettingsTabProps {
  username: string;
}

export interface StackLayoutProps {
  width: string;
  height: string;
}

export interface TabSwitcherProps {
  tabs: Array<TabData>;
}

export interface TabProps {
  title: string;
  children: React.ReactNode;
}

export interface TabsBarItemProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  title: string;
  active: boolean;
}

export interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export interface CustomAccordionProps {
  title: string;
  content: React.ReactNode;
}

export interface YoutubeVideoProps {
  videoId: string;
  style?: React.CSSProperties;
  className?: string;
}

export interface NewHomeworkProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subjects: SubjectsQuery;
}

export interface HomeworkDetailsProps extends NewHomeworkProps {
  homework: Homework;
}
