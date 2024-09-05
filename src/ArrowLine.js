import React from 'react';
import classnames from 'classnames';
import { useContext } from './context';
import style from './style.module.scss';

const ArrowLine = props => {
  const { showArrow } = Object.assign(
    {},
    {
      showArrow: true
    },
    props
  );
  const { vertical } = useContext();
  return (
    <div
      className={classnames(style['arrow-line'], {
        [style['show-arrow']]: showArrow,
        [style['vertical']]: vertical
      })}
    />
  );
};

export default ArrowLine;
