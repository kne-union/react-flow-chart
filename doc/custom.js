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
                        getNodeClassName={({nodeData}) => nodeData.status ? `node-status-${nodeData.status}` : null}
                        onEditNode={({nodeData, replaceNode}) => {
                            replaceNode(Object.assign({}, nodeData, {content: `${nodeData.content}（已编辑）`}));
                        }}/>
    </Flex>;
};

render(<CustomExample/>);
