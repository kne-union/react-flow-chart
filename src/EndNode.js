import React from 'react';
import style from './style.module.scss';

const EndNode = props => {
  const { nodeData } = Object.assign({}, {}, props);
  return <div className={style['end-node-container']}>{nodeData.title}</div>;
};

export default EndNode;
