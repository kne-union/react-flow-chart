import React from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import style from './style.module.scss';

const MIN_SCALE = 10;
const MAX_SCALE = 300;

const ActionBar = props => {
  const { scale, onChange } = Object.assign({}, {}, props);
  const { formatMessage } = useIntl();
  const change = next => onChange(Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)));

  return (
    <div className={classnames('flow-chart-action-bar', style['action-bar'])} onMouseDown={e => e.stopPropagation()}>
      <div className={style['action-scale']}>
        <div
          className={classnames(style['action-scale-btn'], { [style['is-disabled']]: scale >= MAX_SCALE })}
          title={formatMessage({ id: 'zoomIn' })}
          onClick={() => {
            change(scale + 10);
          }}
        >
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M580.722174 437.990403 580.722174 78.171384 436.794158 78.171384 436.794158 437.990403 76.975139 437.990403 76.975139 581.918419 436.794158 581.918419 436.794158 941.737438 580.722174 941.737438 580.722174 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
          </svg>
        </div>
        <div className={style['action-scale-num']}>{scale.toFixed(0)}%</div>
        <div
          className={classnames(style['action-scale-btn'], { [style['is-disabled']]: scale <= MIN_SCALE })}
          title={formatMessage({ id: 'zoomOut' })}
          onClick={() => {
            change(scale - 10);
          }}
        >
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M587.229378 437.990403 580.722174 437.990403 76.975139 437.990403 76.975139 581.918419 580.722174 581.918419 587.229378 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
          </svg>
        </div>
        <div className={style['action-scale-divider']} />
        <div
          className={classnames(style['action-scale-reset'], { [style['is-disabled']]: scale === 100 })}
          title={formatMessage({ id: 'resetScale' })}
          onClick={() => {
            onChange(100);
          }}
        >
          1:1
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
