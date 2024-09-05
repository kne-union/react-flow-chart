import React from 'react';
import style from './style.module.scss';
import ArrowLine from './ArrowLine';
import AddNode from './AddNode';
import { useContext } from './context';
import classnames from 'classnames';

const StartNode = props => {
  const { vertical } = useContext();
  const { nodeData, isMouseEnter } = Object.assign({}, props);
  return (
    <div
      className={classnames(style['start-node-container'], {
        [style['vertical']]: vertical
      })}
    >
      <div className={style['start-node-content']}>{nodeData.title}</div>
      <ArrowLine />
      <AddNode nodeData={nodeData} btnType={isMouseEnter ? 'dot' : ''} />
    </div>
  );
};

export default StartNode;
