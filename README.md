<!--START_SECTION:DOC_MD-->

# react-flow-chart

### 描述

用于展示或编辑一个审批流.

### 安装

```shell
npm i --save @kne/react-flow-chart
```

### 概述

**致谢:** 本项目的大部分代码迁移自 @wanglin1994/simple-flow-chart，源项目为Vue2实现，我将它用React重新实现

[https://github.com/wanglin2/simple-flow-chart](https://github.com/wanglin2/simple-flow-chart)

注意： 本项目的分支数据结构和源项目有所不同，如果使用本项目，请以本项目的文档为主


### 示例

#### 示例样式

```scss
.ant-card {
  border-color: black;
  text-align: center;
  width: 200px;
}
```

#### 示例代码

- 基本示例
- 包含普通节点、条件分支（可嵌套）和并行分支，支持横向、纵向展示
- _ReactFlowChart(@kne/current-lib_react-flow-chart),(@kne/current-lib_react-flow-chart/dist/index.css),antd(antd)

```jsx
const {default: ReactFlowChart} = _ReactFlowChart;
const {Flex, Segmented} = antd;
const {useState} = React;

const BaseExample = () => {
    const [vertical, onChange] = useState(false);
    return <Flex vertical gap={8}>
        <div>
            <Segmented
                options={[{
                    label: '横向', value: false
                }, {
                    label: '纵向', value: true
                }]}
                onChange={onChange} value={vertical}/>
        </div>
        <ReactFlowChart defaultValue={[{'id': 'startEvent', 'type': 'start', 'title': '开始'}, {
            'id': '随机id1', 'type': 'normal', 'title': '申请人', 'content': '员工'
        }, {
            'id': 'ac455ff3-6fbb-4af9-abc7-4553b0ea4bf7', 'type': 'normal', 'title': '普通节点', 'content': '节点内容'
        }, {
            'id': '05561aac-7a2f-4ed9-a71b-9f37ca980cc7', 'type': 'condition', 'title': '条件分支', 'children': [[{
                'id': 'a1684192-e961-46a6-b8f0-b87bfbb045d7', 'type': 'branch', 'title': '条件', 'content': '条件内容'
            }, {
                'id': '239f20cf-7a6f-486f-b68a-be53d926d746', 'type': 'normal', 'title': '普通节点', 'content': '节点内容'
            }], [{
                'id': 'f3bca75a-586c-463e-8a01-9ca432126671', 'type': 'branch', 'title': '条件', 'content': '条件内容'
            }, {
                'id': '1a677d4f-8147-454c-9101-ea8a4818ce83', 'type': 'normal', 'title': '普通节点', 'content': '节点内容'
            }], [{
                'id': 'bad05c8a-d186-4c60-9d22-31472c0fe364', 'type': 'branch', 'title': '条件', 'content': '条件内容'
            }, {
                'id': 'ca240288-18ec-4b19-9e78-3527db6fbc19', 'type': 'condition', 'title': '条件分支', 'children': [[{
                    'id': 'bed6c075-27f4-455f-935e-4bcbc70536bf', 'type': 'branch', 'title': '条件', 'content': '条件内容'
                }], [{
                    'id': '88f01a9a-dcd5-4396-9976-d2ed188996a8', 'type': 'branch', 'title': '条件', 'content': '条件内容'
                }, {
                    'id': '48390694-28da-4f8b-a1b3-58166295c64a', 'type': 'normal', 'title': '普通节点', 'content': '节点内容'
                }]]
            }]]
        }, {
            'id': '07e2e432-1b3c-47e6-ac4a-54a677d9ac69', 'type': 'condition', 'title': '条件分支', 'children': [[{
                'id': '133d8b89-b79a-4daf-ad46-4c2915fec339', 'type': 'branch', 'title': '条件', 'content': '条件内容'
            }], [{'id': '46ee06d5-bbf1-4c4a-8389-71e412d9af51', 'type': 'branch', 'title': '条件', 'content': '条件内容'}]]
        }, {
            'id': 'parallel-1', 'type': 'parallel', 'title': '并行分支', 'content': '全部分支完成后继续', 'children': [[{
                'id': 'parallel-1-branch-1', 'type': 'branch', 'title': '分支', 'content': '财务'
            }, {
                'id': 'parallel-1-node-1', 'type': 'normal', 'title': '财务审批', 'content': '财务经理'
            }], [{
                'id': 'parallel-1-branch-2', 'type': 'branch', 'title': '分支', 'content': '法务'
            }, {
                'id': 'parallel-1-node-2', 'type': 'normal', 'title': '法务审批', 'content': '法务专员'
            }]]
        }, {
            'id': 'c6fb9b16-5124-4bdd-b1c6-a899f257d4b4', 'type': 'normal', 'title': '普通节点', 'content': '节点内容'
        }, {'id': 'endEvent', 'type': 'end', 'title': '结束'}]} onChange={(nodeList) => {
            console.log(JSON.stringify(nodeList));
        }} vertical={vertical} onEditNode={({nodeData}) => {
            console.log('editNode', nodeData);
        }} nodeTemplate={{
            condition: {
                title: '条件内容分支',
                content: '条件内容'
            }
        }}/>
    </Flex>;
};

render(<BaseExample/>);

```

- 自定义节点类型与渲染
- 通过 nodeTypeList 自定义添加菜单，nodeTemplate 支持函数生成默认数据，renderNodeContent 自定义节点内容，getNodeClassName 叠加节点状态样式
- _ReactFlowChart(@kne/current-lib_react-flow-chart),(@kne/current-lib_react-flow-chart/dist/index.css),antd(antd)

```jsx
const {default: ReactFlowChart} = _ReactFlowChart;
const {Flex, Tag} = antd;
const {useState} = React;

const nodeTypeList = [{
    name: '审批', list: [{type: 'approval', name: '审批节点'}, {type: 'cc', name: '抄送节点'}]
}, {
    name: '分支', list: [{type: 'condition', name: '条件分支'}, {type: 'parallel', name: '并行分支'}]
}];

const statusColor = {passed: 'success', running: 'processing', rejected: 'error'};

const CustomExample = () => {
    const [value, setValue] = useState([{id: 'start', type: 'start', title: '发起人'}, {
        id: 'approval-1', type: 'approval', title: '直属上级', content: '上级审批', status: 'passed'
    }, {
        id: 'cc-1', type: 'cc', title: '抄送', content: 'HR', status: 'running'
    }, {id: 'end', type: 'end', title: '结束'}]);
    return <Flex vertical gap={8}>
        <ReactFlowChart value={value} onChange={setValue} nodeTypeList={nodeTypeList}
                        nodeTemplate={{
                            approval: () => ({title: '审批人', content: '请设置审批人'}),
                            cc: {title: '抄送人', content: '请设置抄送人'},
                            parallel: {content: '全部分支完成后继续'},
                            branch: ({parentType}) => parentType === 'parallel' ? {title: '分支', content: '请设置'} : {
                                title: '条件', content: '请设置条件'
                            }
                        }}
                        renderNodeContent={({nodeData, content}) => <Flex gap={4} align="center">
                            {nodeData.status && <Tag color={statusColor[nodeData.status]}>{nodeData.status}</Tag>}
                            <span>{content}</span>
                        </Flex>}
                        getNodeClassName={({nodeData}) => nodeData.status ? &#96;node-status-${nodeData.status}&#96; : null}
                        onEditNode={({nodeData, replaceNode}) => {
                            replaceNode(Object.assign({}, nodeData, {content: &#96;${nodeData.content}（已编辑）&#96;}));
                        }}/>
    </Flex>;
};

render(<CustomExample/>);

```

### API

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

<!--END_SECTION:DOC_MD-->
