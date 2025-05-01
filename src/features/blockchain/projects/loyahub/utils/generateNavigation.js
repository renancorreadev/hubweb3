const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.join(__dirname, '../docs');
const OUTPUT_PATH = path.join(__dirname, '../navigation.generated.json');

function getTitleFromMDX(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Try to get from frontmatter
  const frontmatterMatch = content.match(/title:\s*(.+)/);
  if (frontmatterMatch) {
    return frontmatterMatch[1].replace(/['"]+/g, '').trim();
  }
  // Fallback: first markdown heading
  const headingMatch = content.match(/^#\s+(.+)/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }
  // Fallback: filename
  return path.basename(filePath, '.mdx');
}

function getHrefFromPath(filePath) {
  // Remove DOCS_ROOT and .mdx
  let rel = path.relative(DOCS_ROOT, filePath).replace(/\\/g, '/');
  rel = rel.replace(/\/index\.mdx$/, ''); // Remove /index.mdx
  rel = rel.replace(/\.mdx$/, ''); // Remove .mdx
  if (!rel.startsWith('/')) rel = '/' + rel;
  return `/blockchain/projects/loyahub${rel}`;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Check for index.mdx in the folder
      const indexFile = path.join(fullPath, 'index.mdx');
      let children = walk(fullPath);
      if (fs.existsSync(indexFile)) {
        // Folder with index.mdx: treat as section
        result.push({
          label: getTitleFromMDX(indexFile),
          href: getHrefFromPath(indexFile),
          children: children.length ? children : undefined,
        });
      } else if (children.length) {
        // Folder without index.mdx but with children
        result.push(...children);
      }
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      if (entry.name === 'index.mdx') continue; // Already handled
      result.push({
        label: getTitleFromMDX(fullPath),
        href: getHrefFromPath(fullPath),
      });
    }
  }
  return result;
}

function generateNavigation() {
  return walk(DOCS_ROOT);
}

if (require.main === module) {
  const nav = generateNavigation();
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(nav, null, 2));
  console.log(`Navigation saved to ${OUTPUT_PATH}`);
}

module.exports = { generateNavigation }; 