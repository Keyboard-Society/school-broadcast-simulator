import cookie from "react-cookies";

import { NodeProps, get_default_nodes } from "./Node";
import default_nodes_data from "./default_nodes.json";

export interface ScheduleProps {
  name: string;
  describe: string | null;
  end_time: string;
  nodes: NodeProps[];
}

const defaultSchedule: ScheduleProps = {
  name: default_nodes_data.name,
  describe: default_nodes_data.describe,
  end_time: default_nodes_data.end_time,
  nodes: get_default_nodes(),
};
const cookie_key = "ScheduleKey";

// 获取当前用户cookie
export const getSchedule = (): ScheduleProps => {
  var data = cookie.load(cookie_key);
  if (data == null) {
    data = defaultSchedule;
    setSchedule(default_nodes_data);
  }
  return data;
};

// 用户登录，保存cookie
export const setSchedule = (scheduleData: ScheduleProps) => {
  cookie.save(cookie_key, scheduleData, { path: "/" });
};

// 用户登出，删除cookie
export const resetSchedule = () => {
  cookie.remove(cookie_key);
  setSchedule(default_nodes_data);
  //   window.location.href = "/Login";
};
