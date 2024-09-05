import React from 'react';
import style from './style.module.scss';

const ActionBar = props => {
  const { scale, onChange } = Object.assign({}, {}, props);

  return (
    <div className={style['action-bar']}>
      <div className={style['action-scale']}>
        <div
          className={style['action-scale-btn']}
          onClick={() => {
            onChange(scale + 10);
          }}
        >
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M580.722174 437.990403 580.722174 78.171384 436.794158 78.171384 436.794158 437.990403 76.975139 437.990403 76.975139 581.918419 436.794158 581.918419 436.794158 941.737438 580.722174 941.737438 580.722174 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
          </svg>
        </div>
        <div className={style['action-scale-num']}>{scale.toFixed(0)}%</div>
        <div
          className={style['action-scale-btn']}
          onClick={() => {
            onChange(scale - 10);
          }}
        >
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M587.229378 437.990403 580.722174 437.990403 76.975139 437.990403 76.975139 581.918419 580.722174 581.918419 587.229378 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
