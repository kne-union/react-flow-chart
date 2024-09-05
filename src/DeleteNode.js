import React from 'react';
import style from './style.module.scss';
import { ReactComponent as DeleteSvg } from './delete.svg';
const DeleteNode = props => {
  const { onClick } = Object.assign({}, {}, props);

  return (
    <div
      className={style['delete-node']}
      onClick={e => {
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
      <DeleteSvg />
    </div>
  );
};

export default DeleteNode;
