import React from 'react';
import classnames from 'classnames';
import style from './style.module.scss';
import { useContext } from './context';
import { getDefaultNodeTypeList } from './constant';
import { useIntl } from 'react-intl';

const NodeTypeContent = props => {
  const { onClick } = Object.assign({}, {}, props);
  const { nodeTypeList } = useContext();
  const { formatMessage } = useIntl();
  return (
    <div className={style['node-type-content']}>
      {(nodeTypeList || getDefaultNodeTypeList({ formatMessage })).map((group, groupIndex) => {
        return (
          <div className={style['node-type-group']} key={groupIndex}>
            {group.name && <div className={style['node-type-group-name']}>{group.name}</div>}
            <div className={style['node-type-list']}>
              {group.list.map((nodeType, typeIndex) => {
                return (
                  <div
                    className={classnames(style['node-type-item'], nodeType.className)}
                    key={typeIndex}
                    onClick={e => {
                      onClick && onClick(nodeType);
                    }}
                  >
                    {nodeType.icon && <span className={classnames(style['node-type-item-icon'], 'flow-chart-node-type-icon')}>{nodeType.icon}</span>}
                    <span className={style['node-type-item-text']}>
                      <span className={style['node-type-item-name']}>{nodeType.name}</span>
                      {nodeType.description && <span className={style['node-type-item-desc']}>{nodeType.description}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NodeTypeContent;
