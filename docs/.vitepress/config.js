module.exports = {
    title: 'vue3-treeview',
    description: 'vue3-treeview documentation',
    base: '/vue3-treeview/',
    themeConfig: {
        nav: [
          {
            text: 'Guide',
            link: "/guide/getting-started"
          },
          {
            text: 'Examples',
            link: '/examples/',
          }
        ],
        sidebar: {
            "/guide/": getSidebar()
        }
    }
}

function getSidebar() {
    return [
      {
        text: 'Introduction',
        link: '/guide/getting-started'
      },
      {
        text: 'Properties',
        link: '/guide/properties'
      },
    ]
  }