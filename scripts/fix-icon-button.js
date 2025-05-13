const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 查找所有 .tsx 和 .ts 文件
const files = glob.sync('src/**/*.{ts,tsx}', { cwd: process.cwd() });

// 正则表达式匹配 IconButton 组件的使用
const iconButtonRegex = /<IconButton(?![^>]*color=['"])/g;
const iconButtonReplacement = '<IconButton color="inherit"';

// 统计信息
let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

// 处理每个文件
files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 检查文件是否包含 IconButton 组件
  if (content.includes('<IconButton')) {
    totalFiles++;
    
    // 替换没有 color 属性的 IconButton 组件
    const newContent = content.replace(iconButtonRegex, iconButtonReplacement);
    
    // 如果内容有变化，则写入文件
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      const replacements = (content.match(iconButtonRegex) || []).length;
      totalReplacements += replacements;
      modifiedFiles++;
      console.log(`Modified: ${file} (${replacements} replacements)`);
    }
  }
});

console.log(`\nSummary:`);
console.log(`Total files with IconButton: ${totalFiles}`);
console.log(`Modified files: ${modifiedFiles}`);
console.log(`Total replacements: ${totalReplacements}`);
