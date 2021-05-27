## Lazy loading

In some case you might have a very large amount of nodes to display.
In this case it is recommended to use "lazy loading" and update treeview with
data coming from the server to avoid bad performances. 

::: warning
When using lazy loading, checkbox mode auto will reload all parents state. If the node coming from the server is unchecked it will uncheck all parents when added
:::

<<< @/.vitepress/theme/lazy.vue

<lazy/>