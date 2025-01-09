import React from 'react';
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
            <div className={style['node-type-group-name']}>{group.name}</div>
            <div className={style['node-type-list']}>
              {group.list.map((nodeType, typeIndex) => {
                return (
                  <div
                    className={style['node-type-item']}
                    key={typeIndex}
                    onClick={e => {
                      onClick && onClick(nodeType);
                    }}
                  >
                    {nodeType.name}
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
