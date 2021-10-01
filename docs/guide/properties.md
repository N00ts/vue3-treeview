## Tree

| Prop   | Type                             | Default | Required | Description        |
|--------|----------------------------------|---------|----------|--------------------|
| nodes  | [Object](#nodes)                 | {}      | true     | Nodes              |
| config | [IConfiguration](#configuration) | {}      | true     | Tree configuration |

<iframe src="https://codesandbox.io/embed/basic-1g2jt?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Basic"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Nodes
Type: `{ [id]: Node }`  
Default: <em>Empty Object</em>

> If no node defined nothing will be displayed
``` js
{
    id1: {
        text: "textid1",
        children: ["id11"],
        state: { ... }
    },
    id11: {
        text: "textid11",
        children: [],
        state: { ... }
    },
    id2: {
        text
    }
}
```

## Node
Type: `Object`  
Default: <em>Empty Object</em>

> A node has the following structure:

| Prop     | Type                 | Default | Required | Description                |
|----------|----------------------|---------|----------|----------------------------|
| text     | String               | ""      | false    | Text displayed in the node |
| children | Array                | []      | false    | Array of children          |
| state    | [INodeState](#state) | null    | false    | State of the node          |

``` js
{
    text: "text example",
    children: [ "childrenid1", "childrenid2" ],
    state: {
        opened: true,
        disabled: false
        ...
    }
}
```

## State
Type: `Object`  
Default: <em>Empty Object</em>

| Prop          | Type    | Default | Required | Description                                      |
|---------------|---------|---------|----------|--------------------------------------------------|
| opened        | Boolean | false   | false    | Open or close the node                           |
| disabled      | Boolean | false   | false    | Disable checkbox, node edition and Drag and drop |
| editable      | Boolean | true    | false    | Node field can be edited                         |
| draggable     | Boolean | true    | false    | Determine if a node is draggable or not          |
| dropable      | Boolean | true    | false    | Determine if a node is dropable or not           |
| checked       | Boolean | false   | false    | Node checkbox state                              |
| indeterminate | Boolean | false   | false    | Node checkbox indeterminate state                |
| isLoading     | Boolean | false   | false    | Used for [async loading](./async.md)               |

## Configuration

Tree Configuration
Type: `Object`  
Default: <em>Empty Object</em>

| Prop               | Type            | Default         | Required | Description                                                                                                                                               |
|--------------------|-----------------|-----------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| roots              | Array           | []              | true     | Roots of the tree, this property is mandaroty to build the tree                                                                                           |
| leaves             | Array           | []              | false    | Leaves of the tree, if empty leaves will be nodes without children.  Leaves does not have any Open / Close icon                                           |
| padding            | Number          | 25              | false    | Padding for each new level                                                                                                                                |
| editable           | Boolean         | false           | false    | Determine globally if nodes are editable. When false, no node is editable even if node state is editable                                                  |
| editing            | String          | null            | false    | The id of the current editing node                                                                                                                        |
| editableClass      | String          | "editable"      | false    | Customize node class when node is editable                                                                                                                |
| checkboxes         | Boolean         | false           | false    | Show or hide checkboxes                                                                                                                                   |
| checkMode          | String          | "manual"        | false    | Checkmode can be "manual" or "auto".  When auto mode is enabled, it triggers an event to check children                                                   |
| dragAndDrop        | Boolean         | false           | false    | Enable or disable globally drag and drop                                                                                                                  |
| keyboardNavigation | Boolean         | false           | false    | Enable or disable keyboard navigation. enter: edit node esc: stop edit node up: focus previous node down: focus next node space: check / uncheck checkbox |
| disabled           | Boolean         | false           | false    | Disable all tree nodes                                                                                                                                    |
| disabledClass      | String          | "disabled"      | false    | Customize node class when node is disabled                                                                                                                |
| openedIcon         | [IIcon](#icons) | {}              | false    | Customize icon when node is opened                                                                                                                        |
| closedIcon         | [IIcon](#icons) | {}              | false    | Customize icon when node is closed                                                                                                                        |
| focusClass         | String          | "focused"       | false    | Customize node class when node is focused                                                                                                                 |
| checkedClass       | String          | "checked"       | false    | Customize node class when node is checked                                                                                                                 |
| indeterminateClass | String          | "indeterminate" | false    | Customize node class when node is indeterminate                                                                                                           |

<iframe src="https://codesandbox.io/embed/confogiration-umz56?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Confogiration"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Icons
Type: `Object`  
Default: <em>Empty Object</em>

Open and close icons are customizable 
Icons can be: 
- "shape" you can import a custom SVG shape.
- "class" class svg icon (fontawsome like)
- "image" a classic image coming from web or local image

The following table describe properties by "type" but they are all included in the same interface

### shape

Shape is a custom drawn shape. 
For more information you can consult [SVG icon docs](https://developer.mozilla.org/en-US/docs/Web/SVG).

| Prop    | Type            | Default | Required | Description                                                        |
|---------|-----------------|---------|----------|--------------------------------------------------------------------|
| type    | String          | "shape" | false    | type can be "shape", "class", "img"                                |
| width   | Number          | null    | false    | width of the icon                                                  |
| height  | Number          | null    | false    | height of the icon                                                 |
| class   | String / Array  | null    | false    | Even if your icon is drawn you can add a class to it               |
| style   | String / Object | null    | false    | Inline icon style                                                  |
| viewbox | String          | null    | false    | Viewbox of the drawn icon, for more information check svg icon doc |
| d       | String          | null    | false    | Icon drawn coordinates                                             |
| fill    | String          | null    | false    | Fill color of the svg icon                                         |
| stroke  | String          | null    | false    | SVG icon stroke property                                           |

<iframe src="https://codesandbox.io/embed/icon-shape-685od?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Icon shape"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### Class

A simple way to use svg icons is to design them with classes.
To se how it work you can check [Front Awsome](https://fontawesome.com/)

| Prop  | Type            | Default | Required | Description                         |
|-------|-----------------|---------|----------|-------------------------------------|
| type  | String          | "class" | false    | type can be "shape", "class", "img" |
| class | String / Array  | null    | false    | The corresponding svg class         |
| style | String / Object |         |          |                                     |

<iframe src="https://codesandbox.io/embed/icon-class-kst2h?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Icon class"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### img

You can also decide to use an image as Icon.

| Prop   | Type            | Default | Required | Description                                            |
|--------|-----------------|---------|----------|--------------------------------------------------------|
| type   | String          | "img"   | false    | type can be "shape", "class", "img"                    |
| src    | String          | null    | false    | The image source                                       |
| alt    | String          | null    | false    | The alt tag                                            |
| width  | Number          | null    | false    | width of the icon                                      |
| height | Number          | null    | false    | height of the icon                                     |
| class  | String / Array  | null    | false    | ven if your icon is an image you can add a class to it |
| style  | String / Object | null    | false    | Inline icon style                                      |

<iframe src="https://codesandbox.io/embed/icon-image-3zwlp?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Icon image"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>