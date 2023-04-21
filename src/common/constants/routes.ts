export interface IRouteItem {
  path: string;
  title: string;
}

export const ROUTES = {
  INDEX: {
    path: "/",
    title: "Homepage",
  },
  BLOG: {
    path: "/blog",
    title: "Blog",
  },
  BUILDER: {
    path: "/builder",
    title: "Builder",
  },
  RESOURCES: {
    path: "/resources",
    title: "Resources",
  },
};
