# FlowChart

### 概述

审批流程图

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- \_FlowChart(@components/FlowChart)

```jsx
const { default: FlowChart } = _FlowChart;
const BaseExample = () => {
  return (
    <FlowChart
      defaultValue={[
        { id: 'startEvent', type: 'start', title: '开始' },
        {
          id: '随机id1',
          type: 'normal',
          title: '申请人',
          content: '员工'
        },
        {
          id: 'endEvent',
          type: 'end',
          title: '结束'
        }
      ]}
      onChange={nodeList => {
        console.log(nodeList);
      }}
    />
  );
};

render(<BaseExample />);
```

### API

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
