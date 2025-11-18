/**
 * Script to capture baseline performance metrics before optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 Capturing baseline performance metrics...\n');

// Create baseline directory
const baselineDir = path.join(__dirname, '..', '.performance-baseline');
if (!fs.existsSync(baselineDir)) {
  fs.mkdirSync(baselineDir, { recursive: true });
}

// Capture bundle sizes
console.log('1. Analyzing bundle sizes...');
try {
  execSync('ANALYZE=true pnpm build', { stdio: 'inherit' });
  
  // Read build output
  const buildManifest = path.join(__dirname, '..', '.next', 'build-manifest.json');
  if (fs.existsSync(buildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
    fs.writeFileSync(
      path.join(baselineDir, 'bundle-sizes-baseline.json'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('✅ Bundle sizes captured\n');
  }
} catch (error) {
  console.error('❌ Error analyzing bundles:', error.message);
}

// Capture build time
console.log('2. Measuring build time...');
const buildStart = Date.now();
try {
  execSync('pnpm build', { stdio: 'inherit' });
  const buildTime = Date.now() - buildStart;
  
  fs.writeFileSync(
    path.join(baselineDir, 'build-time-baseline.json'),
    JSON.stringify({ buildTime, timestamp: new Date().toISOString() }, null, 2)
  );
  console.log(`✅ Build time: ${(buildTime / 1000).toFixed(2)}s\n`);
} catch (error) {
  console.error('❌ Error measuring build time:', error.message);
}

// Create baseline summary
const baseline = {
  timestamp: new Date().toISOString(),
  targets: {
    bundleReduction: '30%',
    cssReduction: '25%',
    buildTimeReduction: '20%',
    lcp: '<2.5s',
    fid: '<100ms',
    cls: '<0.1',
  },
  notes: 'Baseline captured before performance optimization implementation',
};

fs.writeFileSync(
  path.join(baselineDir, 'baseline-summary.json'),
  JSON.stringify(baseline, null, 2)
);

console.log('✅ Baseline metrics captured successfully!');
console.log(`📁 Results saved to: ${baselineDir}\n`);
console.log('Next steps:');
console.log('1. Review baseline metrics');
console.log('2. Implement performance optimizations');
console.log('3. Run comparison after optimization');
