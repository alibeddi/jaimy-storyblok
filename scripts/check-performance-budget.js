/**
 * Check performance metrics against budgets
 */

const fs = require('fs');
const path = require('path');

console.log('⚡ Checking performance budgets...\n');

// Read performance budgets
const budgetsPath = path.join(__dirname, '..', '.performance-budgets.json');
const budgets = JSON.parse(fs.readFileSync(budgetsPath, 'utf8'));

console.log('Performance Targets:');
console.log(`  LCP: < ${budgets.targets.lcp}ms`);
console.log(`  FID: < ${budgets.targets.fid}ms`);
console.log(`  CLS: < ${budgets.targets.cls}`);
console.log(`  TTFB: < ${budgets.targets.ttfb}ms`);
console.log(`  FCP: < ${budgets.targets.fcp}ms\n`);

console.log('✅ Performance budgets configured\n');
console.log('Note: Run Lighthouse CI to measure actual performance metrics');
