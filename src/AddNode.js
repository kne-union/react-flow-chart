import { useContext } from './context';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { ReactComponent as AddSvg } from './add.svg';
import NodeTypeContent from './NodeTypeContent';
import style from './style.module.scss';

const AddNode = props => {
  const { nodeData, btnType } = Object.assign({}, { btnType: 'normal' }, props);
  const [addNodeBtnType, setAddNodeBtnType] = useState('');
  const [showNodeTypePopover, setShowNodeTypePopover] = useState(false);
  const [nodeTypePopoverStyle, setNodeTypePopoverStyle] = useState({});

  const nodeTypePopoverRef = useRef(null);

  const { readonly, vertical, emitter } = useContext();
  const type = useMemo(() => {
    return addNodeBtnType === 'normal' ? addNodeBtnType : btnType || addNodeBtnType;
  }, [addNodeBtnType, btnType]);

  const nodeTypePopoverStyleChange = () => {
    const el = nodeTypePopoverRef.current;
    if (!el) {
      return;
    }
    const elWidth = el.offsetWidth,
      elHeight = el.offsetHeight;
    const { left, top } = el.getBoundingClientRect();
    const windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    const style = {};
    style[top + elHeight > windowHeight ? 'bottom' : 'top'] = 0;
    style[left + elWidth > windowWidth ? 'right' : 'left'] = 42 + 'px';

    setNodeTypePopoverStyle(style);
  };

  const nodeTypePopoverStyleReset = () => {
    setNodeTypePopoverStyle({
      left: '42px',
      top: 0
    });
  };

  useEffect(() => {
    if (showNodeTypePopover) {
      nodeTypePopoverStyleChange();
    } else {
      setTimeout(() => {
        nodeTypePopoverStyleReset();
      }, 300);
    }
  }, [showNodeTypePopover]);

  if (readonly) {
    return null;
  }

  return (
    <div
      className={classnames(style['add-node'], {
        [style['vertical']]: vertical
      })}
      onMouseEnter={() => {
        setAddNodeBtnType('normal');
      }}
      onMouseLeave={() => {
        setAddNodeBtnType('');
      }}
    >
      <div
        className={classnames(style['add-node-btn'], type && style[type])}
        onMouseEnter={() => {
          setShowNodeTypePopover(true);
        }}
        onMouseLeave={() => {
          setShowNodeTypePopover(false);
        }}
      >
        <AddSvg />
        <div
          ref={nodeTypePopoverRef}
          className={classnames(style['node-type-popover'], {
            [style['show']]: showNodeTypePopover
          })}
          style={nodeTypePopoverStyle}
        >
          <NodeTypeContent
            onClick={({ type }) => {
              emitter.emit('add-node-type-click', { type, nodeData });
              setShowNodeTypePopover(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNode;
