import { useQuery } from "@tanstack/react-query";
import { axiosWithSetting } from "../services/server-data/server-data";
import { PROJECTS_QUERY_KEY } from "./projects-query";

export { PROJECTS_QUERY_KEY };

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: () =>
      axiosWithSetting.get("project").then((response) => response.data),
  });
};
