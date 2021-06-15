const path = require("path");

module.exports = {
  title: "vue3-treeview",
  description: "vue3-treeview documentation",
  base: "/vue3-treeview/",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
      },
    ],
  ],
  themeConfig: {
    repo: "N00ts/vue3-treeview",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    nav: [
      {
        text: "Guide",
        link: "/guide/getting-started",
      },
      {
        text: "More examples",
        link: "/examples/dragAndDrop",
      },
    ],
    sidebar: {
      "/guide/": getSidebar(),
      "/examples/": getExamplesSidebar(),
    },
  },
  alias: {
    "@docs": path.resolve(__dirname, ".."),
    "@src": path.resolve(__dirname, "../../src"),
  },
};

function getSidebar() {
  return [
    {
      text: "Introduction",
      link: "/guide/getting-started",
    },
    {
      text: "Properties",
      link: "/guide/properties",
    },
    {
      text: "Events",
      link: "/guide/events",
    },
    {
      text: "Slots",
      link: "/guide/slots",
    },
    {
      text: "Async loading",
      link: "/guide/async",
    },
    {
      text: "Transitions",
      link: '/guide/transitions'
    }
  ];
}

function getExamplesSidebar() {
  return [
    {
      text: "Drag and Drop",
      link: "examples/dragAndDrop"
    },
    {
      text: "Icon shape",
      link: "examples/iconShape"
    },
    {
      text: "Icon class",
      link: "examples/iconClass"
    },
    {
      text: "Icon Image",
      link: "examples/iconImage"
    }
  ];
}
