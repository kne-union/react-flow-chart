import React from 'react';
import style from './style.module.scss';
import classnames from 'classnames';
import { useContext } from './context';
import AddNode from './AddNode';
import ArrowLine from './ArrowLine';
import Node from './Node';

const ConditionNode = props => {
  const { nodeData, isMouseEnter } = Object.assign({}, { nodeList: null, data: null, isMouseEnter: false }, props);

  const { vertical, readonly, emitter } = useContext();

  return (
    <div
      className={classnames(style['condition-node-container'], {
        [style['vertical']]: vertical
      })}
    >
      {!readonly && (
        <div
          className={style['condition-add-btn']}
          onClick={() => {
            emitter.emit('add-condition-branch-click', { nodeData });
          }}
        >
          添加条件
        </div>
      )}
      <div className={style['condition-node-item-list']}>
        {nodeData.children.map((node, index) => {
          return (
            <div key={index} className={style['condition-node-item']}>
              <div className={classnames(style['condition-node-item-line'], style['condition-node-item-first-line'])}></div>
              <div className={classnames(style['condition-node-item-line'], style['condition-node-item-last-line'])}></div>
              <div className={style['condition-node-item-link-line']}></div>
              <div className={style['condition-node-item-node-wrap']}>
                {(Array.isArray(node) ? node : [node]).map(node => {
                  return <Node key={node.id} nodeData={node} isMouseEnter={isMouseEnter} />;
                })}
                <div className={style['condition-node-item-link-cross-line']}></div>
              </div>
            </div>
          );
        })}
      </div>
      <ArrowLine />
      <AddNode nodeData={nodeData} btnType={isMouseEnter ? 'dot' : ''} />
    </div>
  );
};

export default ConditionNode;
