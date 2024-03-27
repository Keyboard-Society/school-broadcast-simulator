import cookie from "react-cookies";

import { NodeProps, get_default_nodes } from "./Node";
import default_nodes_data from "./default_nodes.json";

const cookie_key = "ScheduleKey";
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

function setCookie(cname: string, cvalue: any, exdays: number) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

export const setSchedule = (scheduleData: ScheduleProps) => {
  const serializedData = JSON.stringify(scheduleData);
  setCookie(cookie_key, serializedData, 30);
};

export const getSchedule = (): ScheduleProps => {
  var data = cookie.load(cookie_key);
  if (data == "undefined" || data == undefined || data == null) {
    setSchedule(defaultSchedule);
    data = cookie.load(cookie_key);
  }
  console.log("getSchedule", data);
  return data;
};

export const resetSchedule = () => {
  cookie.remove(cookie_key);
  setSchedule(default_nodes_data);
};

export const isScheduleProps = (data: any): data is ScheduleProps => {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "describe" in data &&
    "end_time" in data
  );
};
