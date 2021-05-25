## Event list

| Event          | Arguments | Description                                     |
|----------------|-----------|-------------------------------------------------|
| node-opened    | node      | Triggered when node is opened                   |
| node-closed    | node      | Triggered when node is closed                   |
| node-focus     | node      | Triggered when node is focused                  |
| node-toggle    | node      | Triggered when node is opened or node is closed |
| node-blur      | node      | Triggered when blur node text                   |
| node-edit      | node      | Triggered when node text is getting focused     |
| node-checked   | node      | Triggered when node is checked                  |
| node-unchecked | node      | Triggered when node is unchecked                |
| node-dragstart | context   | Trigerred when drag start                       |
| node-dragenter | context   | Triggered when drag enter                       |
| node-dragleave | context   | Triggered when drag leave                       |
| node-dragend   | context   | Triggered when drag end                         |
| node-over      | context   | Triggered when drag over                        |
| node-drop      | context   | Triggered when drop                             |

## Context
Drag context, is composed of dragged element and target element which are both "IDragContext"

| Variable | Type         | Description     |
|----------|--------------|-----------------|
| dragged  | IDragContext | Dragged context |
| target   | IDragContext | Target context  |

::: warning
In function of the drag event, target may be null
:::

## IDragContext

| Variable | Type    | Description                           |
|----------|---------|---------------------------------------|
| node     | node    | Related node                          |
| element  | Element | Html element of the related node      |
| wrapper  | Element | Wrapper of the related node's element |
| parentId | String  | Id of parent node                     |

