import React from 'react';
import style from './style.module.scss';
import { useContext } from './context';
import classnames from 'classnames';

const NodeContent = props => {
  const { nodeData } = Object.assign({}, {}, props);
  const { emitter, renderNodeContent, renderNodeTitle, getNodeClassName } = useContext();
  const defaultTitle = (typeof nodeData.titleRender === 'function' ? nodeData.titleRender(nodeData) : nodeData.title) || '';
  const title = typeof renderNodeTitle === 'function' ? renderNodeTitle({ nodeData, title: defaultTitle }) : defaultTitle;
  const content =
    typeof renderNodeContent === 'function' ? renderNodeContent({ nodeData, content: nodeData.content }) : nodeData.content;
  return (
    <div
      className={classnames(style['normal-node-content'], 'flow-chart-node-content', typeof getNodeClassName === 'function' && getNodeClassName({ nodeData }))}
      onClick={() => {
        emitter.emit('node-content-click', { nodeData });
      }}
    >
      <div className={style['normal-node-title']}>{title}</div>
      <div className={classnames(style['normal-node-data'], 'flow-chart-node-data')}>
        <div className={style['normal-node-data-text']}>{content || ''}</div>
        <svg className={classnames(style['normal-node-data-icon'], 'flow-chart-node-data-icon')} viewBox="64 64 896 896" fill="currentColor" aria-hidden="true">
          <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
        </svg>
      </div>
    </div>
  );
};

export default NodeContent;
