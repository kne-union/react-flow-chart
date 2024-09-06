import React from 'react';
import style from './style.module.scss';
import arrow from './arrow.svg';
import { useContext } from './context';

const NodeContent = props => {
  const { nodeData } = Object.assign({}, {}, props);
  const { emitter } = useContext();
  return (
    <div
      className={style['normal-node-content']}
      onClick={() => {
        emitter.emit('node-content-click', { nodeData });
      }}
    >
      <div className={style['normal-node-title']}>{nodeData.title || ''}</div>
      <div className={style['normal-node-data']}>
        <div className={style['normal-node-data-text']}>{nodeData.content || ''}</div>
        <img src={arrow} alt="箭头" className={style['normal-node-data-icon']} />
      </div>
    </div>
  );
};

export default NodeContent;
