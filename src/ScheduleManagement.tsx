import { NodeProps, get_default_nodes } from "./Node";
import default_nodes_data from "./default_nodes.json";

const localStorageKey = "ScheduleKey";

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

export const setSchedule = (scheduleData: ScheduleProps) => {
  const serializedData = JSON.stringify(scheduleData);
  localStorage.setItem(localStorageKey, serializedData);
};

export const getSchedule = (): ScheduleProps => {
  const data = localStorage.getItem(localStorageKey);
  if (!data) {
    setSchedule(defaultSchedule);
    return defaultSchedule;
  }
  const parsedData = JSON.parse(data);
  console.log("getSchedule", parsedData);
  return parsedData;
};

export const resetSchedule = () => {
  localStorage.removeItem(localStorageKey);
  setSchedule(defaultSchedule);
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
