import style from './style.module.scss';
import React, { useState, useRef } from 'react';
import NodeContent from './NodeContent';
import DeleteNode from './DeleteNode';
import { useContext } from './context';
import ArrowLine from './ArrowLine';
import AddNode from './AddNode';
import Node from './Node';
import classnames from 'classnames';

const NormalNode = props => {
  const { nodeData, isMouseEnter } = Object.assign({}, {}, props);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const { readonly, vertical, emitter } = useContext();
  const timer = useRef(null);
  return (
    <div
      className={classnames(style['normal-node-container'], {
        [style['vertical']]: vertical
      })}
    >
      <div className={style['normal-node-wrap']}>
        <div
          className={style['normal-node-content-wrap']}
          onMouseEnter={() => {
            clearTimeout(timer.current);
            setShowDeleteBtn(true);
          }}
          onMouseLeave={() => {
            timer.current = setTimeout(() => {
              setShowDeleteBtn(false);
            }, 200);
          }}
        >
          <NodeContent nodeData={nodeData} />
          {showDeleteBtn && !readonly && (
            <DeleteNode
              onClick={() => {
                emitter.emit('delete-node-click', { nodeData });
              }}
            />
          )}
        </div>
        <ArrowLine />
        <AddNode nodeData={nodeData} btnType={isMouseEnter ? 'dot' : ''} />
        {Array.isArray(nodeData.children) &&
          nodeData.children.length > 0 &&
          nodeData.children.map(node => {
            return <Node key={node.id} nodeData={node} isMouseEnter={isMouseEnter} />;
          })}
      </div>
    </div>
  );
};

export default NormalNode;
