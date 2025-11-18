#!/usr/bin/env node

/**
 * Generate comprehensive baseline performance report
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 Generating Performance Baseline Report\n');
console.log('='.repeat(60));

const timestamp = new Date().toISOString();
const baseline = {
  timestamp,
  version: '1.0.0',
  bundles: {},
  totals: {
    js: 0,
    css: 0,
  },
  routes: {},
  targets: {
    jsReduction: '30%',
    cssReduction: '25%',
    buildTimeReduction: '20%',
    lcp: '<2.5s',
    fid: '<100ms',
    cls: '<0.1',
    cacheHitRate: '>95%',
    lighthouseScore: '>90',
  },
};

// 1. Analyze bundle sizes
console.log('\n1. Bundle Sizes');
console.log('-'.repeat(60));

try {
  const chunksDir = path.join(__dirname, '..', '.next', 'static', 'chunks');
  
  if (fs.existsSync(chunksDir)) {
    const files = fs.readdirSync(chunksDir);
    
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(chunksDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        
        baseline.bundles[file] = {
          size: stats.size,
          sizeKB: parseFloat(sizeKB),
        };
        
        baseline.totals.js += stats.size;
        
        // Identify key bundles
        if (file.includes('framework')) {
          console.log(`  Framework:  ${sizeKB} KB`);
        } else if (file.includes('storyblok')) {
          console.log(`  Storyblok:  ${sizeKB} KB`);
        } else if (file.includes('lib')) {
          console.log(`  Libraries:  ${sizeKB} KB`);
        } else if (file.includes('vendor')) {
          console.log(`  Vendor:     ${sizeKB} KB`);
        } else if (file.includes('common')) {
          console.log(`  Common:     ${sizeKB} KB`);
        } else if (file.includes('blok')) {
          console.log(`  Blok:       ${sizeKB} KB`);
        }
      }
    });
    
    console.log(`\n  Total JS:   ${(baseline.totals.js / 1024).toFixed(2)} KB`);
  }
} catch (error) {
  console.error('  ❌ Error analyzing bundles:', error.message);
}

// 2. Analyze CSS
console.log('\n2. CSS Bundles');
console.log('-'.repeat(60));

try {
  const cssDir = path.join(__dirname, '..', '.next', 'static', 'css');
  
  if (fs.existsSync(cssDir)) {
    const files = fs.readdirSync(cssDir);
    
    files.forEach(file => {
      if (file.endsWith('.css')) {
        const filePath = path.join(cssDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        
        baseline.totals.css += stats.size;
        console.log(`  ${file}: ${sizeKB} KB`);
      }
    });
    
    console.log(`\n  Total CSS:  ${(baseline.totals.css / 1024).toFixed(2)} KB`);
  } else {
    console.log('  No CSS files found (using Tailwind JIT)');
  }
} catch (error) {
  console.error('  ❌ Error analyzing CSS:', error.message);
}

// 3. Analyze routes
console.log('\n3. Route Analysis');
console.log('-'.repeat(60));

try {
  const buildManifest = path.join(__dirname, '..', '.next', 'build-manifest.json');
  
  if (fs.existsSync(buildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
    
    Object.entries(manifest.pages).forEach(([route, files]) => {
      let routeSize = 0;
      
      files.forEach(file => {
        const filePath = path.join(__dirname, '..', '.next', file);
        if (fs.existsSync(filePath)) {
          routeSize += fs.statSync(filePath).size;
        }
      });
      
      baseline.routes[route] = {
        files: files.length,
        size: routeSize,
        sizeKB: (routeSize / 1024).toFixed(2),
      };
    });
    
    // Show top 5 largest routes
    const sortedRoutes = Object.entries(baseline.routes)
      .sort((a, b) => b[1].size - a[1].size)
      .slice(0, 5);
    
    console.log('  Top 5 Largest Routes:');
    sortedRoutes.forEach(([route, data]) => {
      console.log(`    ${route}: ${data.sizeKB} KB (${data.files} files)`);
    });
  }
} catch (error) {
  console.error('  ❌ Error analyzing routes:', error.message);
}

// 4. Performance Targets
console.log('\n4. Performance Targets');
console.log('-'.repeat(60));
console.log(`  JS Bundle Reduction:    ${baseline.targets.jsReduction}`);
console.log(`  CSS Bundle Reduction:   ${baseline.targets.cssReduction}`);
console.log(`  Build Time Reduction:   ${baseline.targets.buildTimeReduction}`);
console.log(`  LCP Target:             ${baseline.targets.lcp}`);
console.log(`  FID Target:             ${baseline.targets.fid}`);
console.log(`  CLS Target:             ${baseline.targets.cls}`);
console.log(`  Cache Hit Rate:         ${baseline.targets.cacheHitRate}`);
console.log(`  Lighthouse Score:       ${baseline.targets.lighthouseScore}`);

// 5. Budget Status
console.log('\n5. Budget Status');
console.log('-'.repeat(60));

const budgets = {
  maxJS: 560, // KB
  maxCSS: 112, // KB
};

const currentJS = baseline.totals.js / 1024;
const currentCSS = baseline.totals.css / 1024;

console.log(`  JavaScript: ${currentJS.toFixed(2)} KB / ${budgets.maxJS} KB`);
if (currentJS > budgets.maxJS) {
  console.log(`    ⚠️  OVER BUDGET by ${(currentJS - budgets.maxJS).toFixed(2)} KB`);
  baseline.budgetStatus = 'over';
} else {
  console.log(`    ✅ Within budget (${((budgets.maxJS - currentJS) / budgets.maxJS * 100).toFixed(1)}% headroom)`);
  baseline.budgetStatus = 'within';
}

console.log(`  CSS:        ${currentCSS.toFixed(2)} KB / ${budgets.maxCSS} KB`);
if (currentCSS > budgets.maxCSS) {
  console.log(`    ⚠️  OVER BUDGET by ${(currentCSS - budgets.maxCSS).toFixed(2)} KB`);
} else {
  console.log(`    ✅ Within budget`);
}

// Save baseline report
const reportPath = path.join(__dirname, '..', '.performance-baseline.json');
fs.writeFileSync(reportPath, JSON.stringify(baseline, null, 2));

console.log('\n' + '='.repeat(60));
console.log(`✅ Baseline report saved to: ${reportPath}`);
console.log('='.repeat(60));

// Generate markdown report
const markdown = `# Performance Baseline Report

**Generated:** ${new Date(timestamp).toLocaleString()}

## Bundle Sizes

### JavaScript
- **Total:** ${(baseline.totals.js / 1024).toFixed(2)} KB
- **Budget:** ${budgets.maxJS} KB
- **Status:** ${baseline.budgetStatus === 'within' ? '✅ Within Budget' : '⚠️ Over Budget'}

#### Key Bundles
${Object.entries(baseline.bundles)
  .filter(([name]) => name.includes('framework') || name.includes('storyblok') || name.includes('lib') || name.includes('vendor') || name.includes('common'))
  .map(([name, data]) => `- ${name}: ${data.sizeKB} KB`)
  .join('\n')}

### CSS
- **Total:** ${(baseline.totals.css / 1024).toFixed(2)} KB
- **Budget:** ${budgets.maxCSS} KB

## Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| JS Bundle | ${budgets.maxJS} KB | ${(baseline.totals.js / 1024).toFixed(2)} KB | ${baseline.budgetStatus === 'within' ? '✅' : '⚠️'} |
| CSS Bundle | ${budgets.maxCSS} KB | ${(baseline.totals.css / 1024).toFixed(2)} KB | - |
| LCP | <2.5s | TBD | - |
| FID | <100ms | TBD | - |
| CLS | <0.1 | TBD | - |
| Cache Hit Rate | >95% | TBD | - |
| Lighthouse Score | >90 | TBD | - |

## Top 5 Largest Routes

${Object.entries(baseline.routes)
  .sort((a, b) => b[1].size - a[1].size)
  .slice(0, 5)
  .map(([route, data], i) => `${i + 1}. **${route}**: ${data.sizeKB} KB (${data.files} files)`)
  .join('\n')}

## Next Steps

1. ✅ Baseline captured
2. ⏳ Implement optimizations
3. ⏳ Run Lighthouse audit
4. ⏳ Compare results

---

*Run \`npm run perf:baseline\` to update this report*
`;

const markdownPath = path.join(__dirname, '..', 'PERFORMANCE-BASELINE.md');
fs.writeFileSync(markdownPath, markdown);

console.log(`📄 Markdown report saved to: ${markdownPath}\n`);
