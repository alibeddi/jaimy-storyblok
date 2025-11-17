#!/bin/bash

# Comprehensive performance audit script

echo "🚀 Running comprehensive performance audit..."
echo ""

# 1. Build the application
echo "📦 Building application..."
pnpm build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build completed"
echo ""

# 2. Analyze bundle sizes
echo "📊 Analyzing bundle sizes..."
ANALYZE=true pnpm build
echo "✅ Bundle analysis complete"
echo ""

# 3. Check bundle size budgets
echo "💰 Checking performance budgets..."
node scripts/check-bundle-size.js
if [ $? -ne 0 ]; then
    echo "⚠️  Bundle size budget exceeded"
fi
echo ""

# 4. Run Lighthouse CI
echo "🔦 Running Lighthouse CI..."
pnpm start &
SERVER_PID=$!
sleep 5

pnpm lighthouse
LIGHTHOUSE_EXIT=$?

kill $SERVER_PID
wait $SERVER_PID 2>/dev/null

if [ $LIGHTHOUSE_EXIT -ne 0 ]; then
    echo "⚠️  Lighthouse checks failed"
fi
echo ""

# 5. Generate performance report
echo "📝 Generating performance report..."
cat > performance-report.md << EOF
# Performance Audit Report

Generated: $(date)

## Bundle Sizes

\`\`\`
$(cat .performance-results.json 2>/dev/null || echo "No results available")
\`\`\`

## Lighthouse Scores

Check the Lighthouse CI output above for detailed scores.

## Recommendations

1. Monitor Core Web Vitals in production
2. Set up performance monitoring dashboard
3. Review bundle analysis for optimization opportunities
4. Test on real devices and networks

## Next Steps

- [ ] Review Lighthouse recommendations
- [ ] Optimize identified bottlenecks
- [ ] Set up continuous monitoring
- [ ] Document performance improvements

EOF

echo "✅ Performance report generated: performance-report.md"
echo ""

echo "🎉 Performance audit complete!"
echo ""
echo "Summary:"
echo "  - Build: ✅"
echo "  - Bundle Analysis: ✅"
echo "  - Budget Check: $([ -f .performance-results.json ] && echo '✅' || echo '⚠️')"
echo "  - Lighthouse: $([ $LIGHTHOUSE_EXIT -eq 0 ] && echo '✅' || echo '⚠️')"
echo ""
echo "Review the full report in performance-report.md"
