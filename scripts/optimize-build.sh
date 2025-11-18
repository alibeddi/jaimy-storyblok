#!/bin/bash

# Advanced Build Optimization Script
# This script performs a production build with optimizations and analysis

set -e

echo "🚀 Starting Advanced Build Optimization..."
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
echo "✅ Clean complete"
echo ""

# Run production build with analysis
echo "📦 Building with bundle analysis..."
ANALYZE=true npm run build
echo "✅ Build complete"
echo ""

# Check bundle sizes
echo "📊 Analyzing bundle sizes..."
if [ -d ".next/static/chunks" ]; then
  echo ""
  echo "=== JavaScript Chunks ==="
  du -sh .next/static/chunks/* | sort -h | tail -20
  echo ""
  echo "=== Total Bundle Size ==="
  du -sh .next/static/chunks
  echo ""
fi

# Check for large dependencies
echo "🔍 Checking for large dependencies..."
if command -v npx &> /dev/null; then
  npx -y source-map-explorer '.next/static/chunks/*.js' --html bundle-report.html 2>/dev/null || echo "⚠️  source-map-explorer not available"
fi

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📈 Next steps:"
echo "  1. Review bundle-report.html for detailed analysis"
echo "  2. Run 'npm run lighthouse' to test performance"
echo "  3. Check .next/static/chunks for bundle sizes"
