import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const RouteData: { path: string; notFound?: boolean; page: React.FC }[] =
  [
    {
      path: "/",
      page: Home,
    },
    {
      path: "",
      page: NotFound,
      notFound: true,
    },
  ];
