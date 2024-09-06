import style from './style.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import useEvent from '@kne/use-event';
import { defaultNodeList } from './constant';
import classnames from 'classnames';
import { Provider } from './context';
import ActionBar from './ActionBar';
import Node from './Node';
import { appendNode, removeNode, replaceNode } from './treeUtil';
import { v4 as uuidv4 } from 'uuid';
import useControlValue from '@kne/use-control-value';

const FlowChart = ({ className, ...props }) => {
  const { readonly, showScrollBar, enableDrag, initFit, vertical, onEditNode, ...otherProps } = Object.assign({}, { showScrollBar: true, enableDrag: true, initFit: true, vertical: false }, props);
  const [nodeListState, setNodeList] = useControlValue(otherProps);
  const nodeList = Array.isArray(nodeListState) && nodeListState.length > 0 ? nodeListState : defaultNodeList;
  const [scale, setScale] = useState(100);
  const mousePosition = useRef({});
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const nodeListRef = useRef(null);
  nodeListRef.current = nodeList;
  const onEditNodeRef = useRef(null);
  onEditNodeRef.current = onEditNode;

  const emitter = useEvent({ name: 'flow-chart' });

  useEffect(() => {
    if (initFit) {
      const containerSize = containerRef.current.getBoundingClientRect();
      const containerRatio = containerSize.width / containerSize.height;
      const contentSize = contentRef.current.getBoundingClientRect();
      const contentRatio = contentSize.width / contentSize.height;
      let w, h;
      if (containerRatio > contentRatio) {
        // 以容器的高为准
        h = containerSize.height;
        w = contentRatio * h;
      } else {
        // 以容器的宽为准
        w = containerSize.width;
        h = w / contentRatio;
      }
      setScale(parseInt((w / contentSize.width) * 100));
      const x = (contentSize.width - containerSize.width) / 2;
      const y = (contentSize.height - containerSize.height) / 2;
      containerRef.current.scrollTo(x, y);
    }
  }, [initFit]);

  useEffect(() => {
    emitter.addListener('add-node-type-click', ({ type, nodeData }) => {
      if (type === 'condition') {
        return setNodeList(
          appendNode(nodeListRef.current, {
            currentNodeId: nodeData.id,
            node: {
              id: uuidv4(),
              type: 'condition',
              title: '条件分支',
              children: [
                [
                  {
                    id: uuidv4(),
                    type: 'branch',
                    title: '条件',
                    content: '条件内容'
                  }
                ],
                [
                  {
                    id: uuidv4(),
                    type: 'branch',
                    title: '条件',
                    content: '条件内容'
                  }
                ]
              ]
            }
          })
        );
      }
      if (type === 'normal') {
        return setNodeList(
          appendNode(nodeListRef.current, {
            currentNodeId: nodeData.id,
            node: {
              id: uuidv4(),
              type: 'normal',
              title: '普通节点',
              content: '节点内容'
            }
          })
        );
      }
    });
    emitter.addListener('delete-node-click', ({ nodeData }) => {
      setNodeList(removeNode(nodeListRef.current, { currentNodeId: nodeData.id }));
    });
    emitter.addListener('add-condition-branch-click', ({ nodeData }) => {
      setNodeList(
        appendNode(nodeListRef.current, {
          currentNodeId: nodeData.id,
          type: 'condition',
          node: {
            id: uuidv4(),
            type: 'branch',
            title: '条件',
            content: '条件内容'
          }
        })
      );
    });
    emitter.addListener('node-content-click', ({ nodeData }) => {
      onEditNodeRef.current &&
        onEditNodeRef.current({
          nodeData,
          replaceNode: node => {
            setNodeList(replaceNode(nodeListRef.current, { node }));
          }
        });
    });
    const mouseMoveHandler = e => {
      if (!(mousePosition.current.isMousedown && containerRef.current && enableDrag)) return;
      e.preventDefault();
      let nx = mousePosition.current.scrollLeft - (e.clientX - mousePosition.current.x);
      let ny = mousePosition.current.scrollTop - (e.clientY - mousePosition.current.y);
      containerRef.current.scrollTo(nx, ny);
    };
    const mouseUpHandler = () => {
      mousePosition.current.isMousedown = false;
    };
    window.addEventListener('mousemove', mouseMoveHandler, false);
    window.addEventListener('mouseup', mouseUpHandler, false);
    return () => {
      emitter.removeAllListeners();
      window.removeEventListener('mousemove', mouseMoveHandler, false);
      window.removeEventListener('mouseup', mouseUpHandler, false);
    };
  }, [emitter, enableDrag, setNodeList]);

  return (
    <Provider
      value={{
        readonly,
        vertical,
        nodeList,
        emitter
      }}
    >
      <div
        ref={containerRef}
        className={classnames(className, 'flow-chart-container', style['container'], {
          [style['show-scrollbar']]: showScrollBar
        })}
        onMouseDown={e => {
          mousePosition.current.isMousedown = true;
          mousePosition.current.x = e.clientX;
          mousePosition.current.y = e.clientY;
          mousePosition.current.scrollLeft = containerRef.current.scrollLeft;
          mousePosition.current.scrollTop = containerRef.current.scrollTop;
        }}
      >
        <ActionBar scale={scale} onChange={setScale} />
        <div
          ref={contentRef}
          className={classnames('flow-chart-content', style['content'], {
            [style['vertical']]: vertical,
            [style['is-scale']]: scale <= 100
          })}
          style={{ transform: `scale(${scale / 100})` }}
        >
          {nodeList.map(node => {
            return <Node key={node.id} nodeList={nodeList} nodeData={node} />;
          })}
        </div>
      </div>
    </Provider>
  );
};

export default FlowChart;
