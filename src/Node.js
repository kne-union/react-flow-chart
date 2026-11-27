import style from './style.module.scss';
import React, { useState } from 'react';
import StartNode from './StartNode';
import EndNode from './EndNode';
import ConditionNode from './ConditionNode';
import NormalNode from './NormalNode';
import classnames from 'classnames';

const Node = props => {
  const { nodeData, belongConditionNodeData, isMouseEnter } = Object.assign({}, {}, props);
  const [isCurrentMouseEnter, setIsCurrentMouseEnter] = useState(false);

  const renderNode = ({ nodeData }) => {
    if (nodeData.type === 'start') {
      return <StartNode nodeData={nodeData} isMouseEnter={isMouseEnter || isCurrentMouseEnter} />;
    }
    if (nodeData.type === 'end') {
      return <EndNode nodeData={nodeData} />;
    }
    if (nodeData.type === 'condition' || nodeData.type === 'parallel') {
      return <ConditionNode nodeData={nodeData} isMouseEnter={isMouseEnter || isCurrentMouseEnter} />;
    }

    return <NormalNode nodeData={nodeData} isMouseEnter={isMouseEnter || isCurrentMouseEnter} belongConditionNodeData={belongConditionNodeData} />;
  };
  return (
    <div
      className={classnames(style['node-container'], `flow-chart-node-${nodeData.type}`)}
      onMouseEnter={() => {
        setIsCurrentMouseEnter(true);
      }}
      onMouseLeave={() => {
        setIsCurrentMouseEnter(false);
      }}
    >
      {renderNode({ nodeData })}
    </div>
  );
};

export default Node;
