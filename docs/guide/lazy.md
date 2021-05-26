## Lazy loading

In some case you might have a very large amount of nodes to display.
In this case it is recommended to use "lazy loading" and update treeview with
data coming from the server to avoid bad performances. 

::: warning
When using lazy loading, checkbox mode auto will not work since the the treeview does no know about the elements on your server. In this case it is better if you handle it manually with the given events
:::

