// fix-icon-buttons.js
// 这个脚本用于修复所有使用 IconButton 的组件，确保与 MUI v7 兼容
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 查找所有使用 IconButton 的 .tsx 文件
const files = glob.sync('src/**/*.tsx', { cwd: __dirname });

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 查找并修复 IconButton 组件
  const iconButtonRegex = /<IconButton[^>]*sx=\{\{[^}]*color:[^}]*\}\}[^>]*>/g;
  const matches = content.match(iconButtonRegex);
  
  if (matches) {
    matches.forEach(match => {
      // 提取 color 值
      const colorMatch = match.match(/color:\s*['"]([^'"]+)['"]/);
      let colorValue = 'inherit';
      
      if (colorMatch && colorMatch[1]) {
        // 如果找到 color 值，使用它
        if (colorMatch[1].includes('text.secondary')) {
          colorValue = 'inherit';
        } else if (colorMatch[1].includes('primary')) {
          colorValue = 'primary';
        } else if (colorMatch[1].includes('secondary')) {
          colorValue = 'secondary';
        } else if (colorMatch[1].includes('error')) {
          colorValue = 'error';
        } else if (colorMatch[1].includes('warning')) {
          colorValue = 'warning';
        } else if (colorMatch[1].includes('info')) {
          colorValue = 'info';
        } else if (colorMatch[1].includes('success')) {
          colorValue = 'success';
        }
      }
      
      // 创建修复后的组件
      const fixedMatch = match.replace(/sx=\{\{[^}]*color:[^}]*\}\}/, `color='${colorValue}'`);
      
      // 替换原始内容
      content = content.replace(match, fixedMatch);
      fixedCount++;
    });
    
    // 保存修改后的文件
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${matches.length} IconButton components in ${file}`);
  }
});

console.log(`Total fixed: ${fixedCount} IconButton components`);
