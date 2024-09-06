const { default: ReactFlowChart } = _ReactFlowChart;
const { Flex, Segmented } = antd;
const { useState } = React;

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
        onChange={onChange} value={vertical} />
    </div>
    <ReactFlowChart defaultValue={[{ 'id': 'startEvent', 'type': 'start', 'title': '开始' }, {
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
      }], [{ 'id': '46ee06d5-bbf1-4c4a-8389-71e412d9af51', 'type': 'branch', 'title': '条件', 'content': '条件内容' }]]
    }, {
      'id': 'c6fb9b16-5124-4bdd-b1c6-a899f257d4b4', 'type': 'normal', 'title': '普通节点', 'content': '节点内容'
    }, { 'id': 'endEvent', 'type': 'end', 'title': '结束' }]} onChange={(nodeList) => {
      console.log(JSON.stringify(nodeList));
    }} vertical={vertical} onEditNode={({ nodeData }) => {
      console.log('editNode', nodeData);
    }} />
  </Flex>;
};

render(<BaseExample />);
