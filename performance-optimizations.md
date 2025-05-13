# React 19 性能优化指南

本文档提供了利用 React 19 新特性优化应用程序性能的建议和实践。

## 1. 利用改进的错误处理机制

React 19 改变了错误处理方式，不再重新抛出渲染期间的错误。我们可以使用新的错误处理 API 来改进应用程序的错误处理：

```jsx
// 在应用程序入口点（_app.tsx）中使用新的错误处理选项
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    // 处理未捕获的错误，例如发送到错误跟踪服务
    console.error('Uncaught error:', error, errorInfo);
  },
  onCaughtError: (error, errorInfo) => {
    // 处理被 Error Boundary 捕获的错误
    console.error('Caught error:', error, errorInfo);
  }
});
```

## 2. 使用 React.memo 和 useMemo 优化渲染性能

React 19 改进了 memo 和 useMemo 的实现，使它们更加高效。我们应该在适当的地方使用这些 API 来避免不必要的重新渲染：

```jsx
// 使用 React.memo 优化组件
const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// 使用 useMemo 优化计算
function Component({ data }) {
  const processedData = useMemo(() => {
    return expensiveComputation(data);
  }, [data]);
  
  return <div>{processedData}</div>;
}
```

## 3. 使用 useCallback 优化事件处理器

使用 useCallback 可以避免在每次渲染时创建新的函数引用，这对于传递回调给子组件特别有用：

```jsx
function ParentComponent() {
  const handleClick = useCallback(() => {
    // 处理点击事件
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
}
```

## 4. 利用 React 19 的并发特性

React 19 改进了并发模式的实现，我们可以使用 startTransition 和 useTransition 来标记非紧急更新：

```jsx
import { startTransition, useTransition } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    // 立即更新输入值
    setSearchTerm(e.target.value);
    
    // 将搜索结果更新标记为非紧急
    startTransition(() => {
      // 执行搜索操作
      performSearch(e.target.value);
    });
  };
  
  return (
    <div>
      <input value={searchTerm} onChange={handleChange} />
      {isPending ? <Spinner /> : <SearchResults />}
    </div>
  );
}
```

## 5. 使用 React Profiler 识别性能瓶颈

React 19 改进了 Profiler API，我们可以使用它来识别应用程序中的性能瓶颈：

```jsx
import { Profiler } from 'react';

function onRenderCallback(
  id, // 发生提交的 Profiler 树的 "id"
  phase, // "mount" 或 "update" 
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
) {
  // 记录或聚合渲染时间
  console.log(`Component ${id} took ${actualDuration}ms to render`);
}

function MyComponent() {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <div>
        {/* 组件内容 */}
      </div>
    </Profiler>
  );
}
```

## 6. 代码分割和懒加载

使用 React.lazy 和 Suspense 可以实现组件的懒加载，减少初始加载时间：

```jsx
import React, { Suspense } from 'react';

// 懒加载组件
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

## 7. 使用 Fragment 减少不必要的 DOM 节点

使用 Fragment 可以避免添加额外的 DOM 节点，减少内存使用和提高渲染性能：

```jsx
import React, { Fragment } from 'react';

function ListItems() {
  return (
    <Fragment>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </Fragment>
  );
}
```

## 8. 避免不必要的重新渲染

确保组件只在必要时重新渲染，避免在渲染期间创建新对象或函数：

```jsx
// 不好的做法
function Component() {
  return <ChildComponent options={{ foo: 'bar' }} />;
}

// 好的做法
function Component() {
  const options = useMemo(() => ({ foo: 'bar' }), []);
  return <ChildComponent options={options} />;
}
```

## 9. 使用 React DevTools Profiler 进行性能分析

React DevTools Profiler 是一个强大的工具，可以帮助识别性能问题和优化机会：

1. 安装 React DevTools 浏览器扩展
2. 打开 DevTools，切换到 Profiler 标签
3. 点击记录按钮，执行要分析的操作
4. 分析结果，找出渲染时间长的组件

## 10. 实施虚拟滚动

对于长列表，使用虚拟滚动可以显著提高性能：

```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

## 实施计划

1. 首先使用 React DevTools Profiler 分析应用程序，识别性能瓶颈
2. 优先实施错误处理改进，提高应用程序稳定性
3. 对频繁重新渲染的组件应用 React.memo 和 useMemo
4. 对大型列表应用虚拟滚动
5. 实施代码分割和懒加载，减少初始加载时间
6. 利用并发特性优化用户交互体验
7. 持续监控和优化性能
