## Async loading

In some case you might have a very large amount of nodes to display.
In this case you can to use "async loading" and update treeview with data coming from the server and have infinite nodes. 

::: warning
When using async loading, checkbox mode auto will reload all parents state. If the node coming from the server is unchecked it will uncheck all parents when added
:::

<iframe src="https://codesandbox.io/embed/async-3epzc?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Async"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>