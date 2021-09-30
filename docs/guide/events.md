## Event list

| Event          | Arguments                    | Description                                     |
|----------------|------------------------------|-------------------------------------------------|
| node-opened    | [node](./properties.md#node) | Triggered when node is opened                   |
| node-closed    | [node](./properties.md#node) | Triggered when node is closed                   |
| node-focus     | [node](./properties.md#node) | Triggered when node is focused                  |
| node-toggle    | [node](./properties.md#node) | Triggered when node is opened or node is closed |
| node-blur      | [node](./properties.md#node) | Triggered when blur node text                   |
| node-edit      | [node](./properties.md#node) | Triggered when node text is getting focused     |
| node-checked   | [node](./properties.md#node) | Triggered when node is checked                  |
| node-unchecked | [node](./properties.md#node) | Triggered when node is unchecked                |
| node-dragstart | [context](#context)          | Trigerred when drag start                       |
| node-dragenter | [context](#context)          | Triggered when drag enter                       |
| node-dragleave | [context](#context)          | Triggered when drag leave                       |
| node-dragend   | [context](#context)          | Triggered when drag end                         |
| node-over      | [context](#context)          | Triggered when drag over                        |
| node-drop      | [context](#context)          | Triggered when drop                             |

::: tip
Try events yourself (go check the console with F12) 
:::

<iframe src="https://codesandbox.io/embed/events-7st2s?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Events"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Context
Drag context, is composed of dragged element and target element which are both "IDragContext"

| Variable | Type                          | Description     |
|----------|-------------------------------|-----------------|
| dragged  | [IDragContext](#idragcontext) | Dragged context |
| target   | [IDragContext](#idragcontext) | Target context  |

::: warning
In function of the drag event, target may be null
:::

## IDragContext

| Variable | Type                         | Description                           |
|----------|------------------------------|---------------------------------------|
| node     | [node](./properties.md#node) | Related node                          |
| element  | Element                      | Html element of the related node      |
| wrapper  | Element                      | Wrapper of the related node's element |
| parentId | String                       | Id of parent node                     |

