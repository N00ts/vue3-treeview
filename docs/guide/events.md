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

<<< @/.vitepress/theme/components/events.vue

<events/>

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

