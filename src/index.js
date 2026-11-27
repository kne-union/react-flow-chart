import style from './style.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import useEvent from '@kne/use-event';
import { getDefaultNodeList } from './constant';
import classnames from 'classnames';
import { Provider } from './context';
import ActionBar from './ActionBar';
import Node from './Node';
import { appendNode, removeNode, replaceNode, isBranchContainer } from './treeUtil';
import { v4 as uuidv4 } from 'uuid';
import useControlValue from '@kne/use-control-value';
import { IntlProvider, useIntl } from 'react-intl';
import localeLoader from './loader';
import zhCn from './locale/zh-cn';
import { message } from './loader';

localeLoader('zh-cn', zhCn);

const FlowChart = ({ className, ...props }) => {
  const { readonly, showScrollBar, enableDrag, initFit, vertical, onEditNode, nodeTemplate, nodeTypeList, renderNodeContent, renderNodeTitle, getNodeClassName, ...otherProps } = Object.assign(
    {},
    {
      showScrollBar: true,
      enableDrag: true,
      initFit: true,
      vertical: false,
      nodeTemplate: {}
    },
    props
  );
  const { formatMessage } = useIntl();
  const [nodeListState, setNodeList] = useControlValue(otherProps);
  const nodeList = Array.isArray(nodeListState) && nodeListState.length > 0 ? nodeListState : getDefaultNodeList({ formatMessage });
  const [scale, setScale] = useState(100);
  const mousePosition = useRef({});
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const nodeListRef = useRef(null);
  nodeListRef.current = nodeList;
  const onEditNodeRef = useRef(null);
  onEditNodeRef.current = onEditNode;
  const nodeTemplateRef = useRef(null);
  nodeTemplateRef.current = nodeTemplate;

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
    const getTemplate = (type, parentType) => {
      const template = nodeTemplateRef.current?.[type];
      return typeof template === 'function' ? template({ type, parentType }) : template;
    };
    const createBranch = parentType => {
      const defaultBranch =
        parentType === 'parallel' ? { title: formatMessage({ id: 'branch' }), content: formatMessage({ id: 'branchContent' }) } : { title: formatMessage({ id: 'condition' }), content: formatMessage({ id: 'conditionContent' }) };
      return Object.assign({}, defaultBranch, getTemplate('branch', parentType), {
        id: uuidv4(),
        type: 'branch'
      });
    };
    const defaultTitles = {
      condition: { title: formatMessage({ id: 'conditionBranch' }) },
      parallel: { title: formatMessage({ id: 'parallelBranch' }) },
      normal: { title: formatMessage({ id: 'normalNode' }), content: formatMessage({ id: 'nodeContent' }) }
    };
    emitter.addListener('add-node-type-click', ({ type, nodeData }) => {
      const node = Object.assign({}, defaultTitles[type], getTemplate(type), {
        id: uuidv4(),
        type
      });
      if (isBranchContainer(type)) {
        node.children = [[createBranch(type)], [createBranch(type)]];
      }
      setNodeList(appendNode(nodeListRef.current, { currentNodeId: nodeData.id, node }));
    });
    emitter.addListener('delete-node-click', ({ nodeData }) => {
      setNodeList(removeNode(nodeListRef.current, { currentNodeId: nodeData.id }));
    });
    emitter.addListener('add-condition-branch-click', ({ nodeData }) => {
      setNodeList(
        appendNode(nodeListRef.current, {
          currentNodeId: nodeData.id,
          type: 'branch',
          node: createBranch(nodeData.type)
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
  }, [emitter, enableDrag, setNodeList, formatMessage]);

  return (
    <Provider
      value={{
        readonly,
        vertical,
        nodeList,
        nodeTypeList,
        renderNodeContent,
        renderNodeTitle,
        getNodeClassName,
        emitter
      }}
    >
      <div className={classnames('flow-chart-wrapper', style['wrapper'])}>
        <ActionBar scale={scale} onChange={setScale} />
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
      </div>
    </Provider>
  );
};

const FlowChartIntl = ({ locale = 'zh-cn', ...props }) => {
  return (
    <IntlProvider messages={message[locale]} locale={locale}>
      <FlowChart {...props} />
    </IntlProvider>
  );
};
export default FlowChartIntl;
export { localeLoader };
export { default as treeUtil } from './treeUtil';
