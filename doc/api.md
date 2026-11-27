| 属性名               | 说明                                                                                                  | 类型                                     | 默认值   |
|-------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------|-------|
| value             | 节点数据，受控模式                                                                                           | array                                  | -     |
| defaultValue      | 节点数据，非受控模式                                                                                          | array                                  | -     |
| onChange          | 节点数据发生修改时触发事件                                                                                       | function                               | -     |
| readonly          | 是否只读                                                                                                | boolean                                | false |
| showScrollBar     | 是否展示滚动条                                                                                             | boolean                                | true  |
| enableDrag        | 内容区域是否可以拖拽滚动                                                                                        | boolean                                | true  |
| initFit           | 初始化时是否自适应缩放大小                                                                                       | boolean                                | true  |
| vertical          | 是否纵向展示                                                                                              | boolean                                | false |
| onEditNode        | 点击节点内容触发事件，参数为 `{ nodeData, replaceNode }`，调用 `replaceNode(node)` 修改节点数据                                | function                               | -     |
| nodeTypeList      | 添加节点菜单，格式为 `[{ name, list: [{ type, name }] }]`；`type` 可以是任意自定义类型，`condition`、`parallel` 为分支容器              | array                                  | 内置普通节点、条件分支、并行分支 |
| nodeTemplate      | 按节点类型设置新建节点的默认数据，值可以是对象或 `({ type, parentType }) => object`；`branch` 的 `parentType` 为所在分支容器类型 | object                                 | {}    |
| renderNodeContent | 自定义节点内容区，参数为 `{ nodeData, content }`                                                               | function                               | -     |
| getNodeClassName  | 为节点卡片追加 className，参数为 `{ nodeData }`，可用于展示运行状态（开始、结束节点没有卡片）                                         | function                               | -     |

#### 节点数据

| 字段       | 说明                                                                       |
|----------|--------------------------------------------------------------------------|
| id       | 节点唯一标识                                                                   |
| type     | `start`、`end`、`condition`（条件分支）、`parallel`（并行分支）、`branch`（分支头），其余类型均按普通节点渲染 |
| title    | 节点标题                                                                     |
| content  | 节点内容；分支容器设置了 `content` 时会展示容器头部，可点击编辑                                         |
| children | 分支容器的分支列表，格式为 `[[branch, ...nodes], ...]`，每个分支以一个 `branch` 节点开头                    |

节点外层会带上 `flow-chart-node-{type}` className，分支容器带上 `flow-chart-{type}-node` className，节点卡片带上 `flow-chart-node-content` className。

#### treeUtil

导出 `treeUtil`：`findNode`、`appendNode`、`removeNode`、`replaceNode`、`isBranchContainer`，用于在外部操作节点树。
