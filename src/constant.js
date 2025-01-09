export const getDefaultNodeList = ({ formatMessage }) => [
  { id: 'startEvent', type: 'start', title: formatMessage('start') },
  {
    id: 'endEvent',
    type: 'end',
    title: formatMessage('end')
  }
];

export const getDefaultNodeTypeList = ({ formatMessage }) => {
  return [
    {
      name: formatMessage({ id: 'normalNode' }),
      list: [
        {
          type: 'normal',
          name: formatMessage({ id: 'normalNode' })
        }
      ]
    },
    {
      name: formatMessage({ id: 'branchNode' }),
      list: [
        {
          type: 'condition',
          name: formatMessage({ id: 'conditionBranch' })
        }
      ]
    }
  ];
};
