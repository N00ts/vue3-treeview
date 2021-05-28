## Async loading

In some case you might have a very large amount of nodes to display.
In this case you can to use "async loading" and update treeview with data coming from the server and have infinite nodes. 

::: warning
When using async loading, checkbox mode auto will reload all parents state. If the node coming from the server is unchecked it will uncheck all parents when added
:::

<<< @/.vitepress/theme/components/async.vue

<async/>