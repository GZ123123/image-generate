export interface IRouteItem {
  path: string;
  title: string;
}

export const ROUTES = {
  INDEX: {
    path: "/builder",
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
  GENERATE: {
    path: "/generate",
    title: "Generate",
  },
};

export const CMS_ROUTES = {
  LOGIN: {
    INDEX: {
      path: "/cms/login",
      title: "Login",
    },
  },
  CATEGORY: {
    INDEX: {
      path: "/cms/category",
      title: "Category",
    },
  },
  RESOURCES: {
    INDEX: {
      path: "/cms/resources",
      title: "Resources",
    },
    CREATE: {
      path: "/cms/resources/form",
      title: "Create Resources",
    },
    UPDATE: {
      path: "/cms/resources/form/[id]",
      title: "Update Resources",
    },
  },
  BLOG: {
    INDEX: {
      path: "/cms/blogs",
      title: "Blogs",
    },
    CREATE: {
      path: "/cms/blogs/form",
      title: "Create Blogs",
    },
    UPDATE: {
      path: "/cms/blogs/form/[id]",
      title: "Update Blogs",
    },
  },
};
