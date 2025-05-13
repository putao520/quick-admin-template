# MUI v7 兼容性修复指南

## 问题描述

在升级到 MUI v7 后，控制台出现了以下错误：

```
[ERROR] The above error occurred in the <MuiIconButtonRoot> component. React will try to recreate this component tree from scratch using the error boundary you provided, PagesDevOverlayErrorBoundary.
```

这个错误表明 IconButton 组件在 MUI v7 中有一些变更，导致现有代码不兼容。

## 修复方案

### 1. IconButton 组件修复

MUI v7 中对 IconButton 组件进行了一些变更，我们需要确保所有使用 IconButton 的地方都符合新的 API 要求。主要的修复包括：

1. 确保 IconButton 的 size 属性值正确（只接受 'small'、'medium' 或 'large'）
2. 确保 IconButton 的 color 属性值正确
3. 检查是否有使用已废弃的属性

### 2. 修复步骤

1. 检查所有使用 IconButton 的组件
2. 确保 size 属性使用正确的值
3. 确保 color 属性使用正确的值
4. 移除任何已废弃的属性
5. 确保 IconButton 的子元素是有效的图标组件

### 3. 示例修复

以下是一个示例修复，展示如何更新 IconButton 组件：

```jsx
// 修复前
<IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
  <DotsVertical />
</IconButton>

// 修复后
<IconButton 
  size='small' 
  aria-label='settings' 
  className='card-more-options' 
  color='default'  // 明确指定 color 而不是通过 sx 设置
>
  <DotsVertical />
</IconButton>
```

### 4. 批量修复命令

可以使用以下命令查找所有使用 IconButton 的文件：

```bash
npx grep-cli "IconButton" --glob "**/*.tsx" --directory "src"
```

然后对每个文件进行检查和修复。

## 其他可能的问题

如果上述修复不能解决问题，可能需要考虑以下几点：

1. 检查是否有自定义的 IconButton 样式覆盖
2. 检查主题配置中是否有对 IconButton 的自定义设置
3. 确保所有依赖的版本兼容

## 后续步骤

1. 实施上述修复
2. 测试所有使用 IconButton 的页面和功能
3. 监控控制台是否有其他错误
