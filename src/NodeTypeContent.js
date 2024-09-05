import React from 'react';
import style from './style.module.scss';
import { useContext } from './context';
import { defaultNodeTypeList } from './constant';

const NodeTypeContent = props => {
  const { onClick } = Object.assign({}, {}, props);
  const { nodeTypeList } = useContext();
  return (
    <div className={style['node-type-content']}>
      {(nodeTypeList || defaultNodeTypeList).map((group, groupIndex) => {
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
