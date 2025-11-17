/**
 * Check bundle sizes against performance budgets
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Checking bundle sizes...\n');

// Read performance budgets
const budgetsPath = path.join(__dirname, '..', '.performance-budgets.json');
const budgets = JSON.parse(fs.readFileSync(budgetsPath, 'utf8'));

// Read build manifest
const manifestPath = path.join(__dirname, '..', '.next', 'build-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ Build manifest not found. Run build first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Calculate total sizes
let totalJS = 0;
let totalCSS = 0;
const warnings = [];
const errors = [];

// Check each page
Object.entries(manifest.pages).forEach(([page, files]) => {
  files.forEach((file) => {
    const filePath = path.join(__dirname, '..', '.next', file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = stats.size / 1024;
      
      if (file.endsWith('.js')) {
        totalJS += sizeKB;
      } else if (file.endsWith('.css')) {
        totalCSS += sizeKB;
      }
    }
  });
});

const totalSize = totalJS + totalCSS;

console.log('Bundle Sizes:');
console.log(`  JavaScript: ${totalJS.toFixed(2)} KB`);
console.log(`  CSS: ${totalCSS.toFixed(2)} KB`);
console.log(`  Total: ${totalSize.toFixed(2)} KB\n`);

// Check against budgets
budgets.budgets.forEach((budget) => {
  const maxSizeKB = parseInt(budget.maxSize);
  
  if (budget.type === 'total') {
    if (budget.path.includes('.js') && totalJS > maxSizeKB) {
      errors.push(`❌ JavaScript bundle (${totalJS.toFixed(2)} KB) exceeds budget (${maxSizeKB} KB)`);
    } else if (budget.path.includes('.css') && totalCSS > maxSizeKB) {
      errors.push(`❌ CSS bundle (${totalCSS.toFixed(2)} KB) exceeds budget (${maxSizeKB} KB)`);
    }
  }
});

// Check warnings (within 10% of budget)
budgets.budgets.forEach((budget) => {
  const maxSizeKB = parseInt(budget.maxSize);
  const warningThreshold = maxSizeKB * 0.9;
  
  if (budget.type === 'total') {
    if (budget.path.includes('.js') && totalJS > warningThreshold && totalJS <= maxSizeKB) {
      warnings.push(`⚠️  JavaScript bundle (${totalJS.toFixed(2)} KB) is close to budget (${maxSizeKB} KB)`);
    } else if (budget.path.includes('.css') && totalCSS > warningThreshold && totalCSS <= maxSizeKB) {
      warnings.push(`⚠️  CSS bundle (${totalCSS.toFixed(2)} KB) is close to budget (${maxSizeKB} KB)`);
    }
  }
});

// Output results
if (warnings.length > 0) {
  console.log('Warnings:');
  warnings.forEach((warning) => console.log(warning));
  console.log('');
}

if (errors.length > 0) {
  console.log('Errors:');
  errors.forEach((error) => console.log(error));
  console.log('');
  
  // Write results for CI
  fs.writeFileSync(
    '.performance-results.json',
    JSON.stringify({
      passed: false,
      bundleSize: {
        js: `${totalJS.toFixed(2)} KB`,
        css: `${totalCSS.toFixed(2)} KB`,
        total: `${totalSize.toFixed(2)} KB`,
      },
      warnings,
      errors,
    }, null, 2)
  );
  
  process.exit(1);
}

console.log('✅ All bundle size checks passed!\n');

// Write results for CI
fs.writeFileSync(
  '.performance-results.json',
  JSON.stringify({
    passed: true,
    bundleSize: {
      js: `${totalJS.toFixed(2)} KB`,
      css: `${totalCSS.toFixed(2)} KB`,
      total: `${totalSize.toFixed(2)} KB`,
    },
    warnings,
    errors: [],
  }, null, 2)
);
