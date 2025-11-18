# Lighthouse Performance Audit Results

**Date:** November 17, 2025  
**URL Tested:** http://localhost:3001/nl/nl/pages

## Summary

✅ **Build:** Successful  
✅ **Lighthouse CI:** Running successfully  
⚠️ **Performance Issues Found**

## Performance Metrics

### Failed Assertions

1. **Performance Score: 0.78** ❌
   - Target: ≥0.9
   - Gap: -0.12 (12% below target)

2. **Cumulative Layout Shift (CLS): 0.54** ❌
   - Target: ≤0.1
   - Issue: 5.4x higher than target
   - This indicates significant layout instability

## Root Causes

### High CLS (0.54)
The high Cumulative Layout Shift is likely caused by:
- Images loading without proper dimensions
- Dynamic content insertion
- Web fonts loading and causing text reflow
- Missing aspect ratios on image containers

### Lower Performance Score (0.78)
Contributing factors:
- Storyblok image service returning 502 errors
- Large JavaScript bundle size (371 kB)
- Potential render-blocking resources

## Recommendations

### Immediate Actions

1. **Fix Layout Shift Issues:**
   - Ensure all images have explicit width/height attributes
   - Add proper aspect ratios to image containers
   - Use `font-display: swap` or `optional` for web fonts
   - Reserve space for dynamic content

2. **Optimize Images:**
   - Investigate Storyblok image service 502 errors
   - Implement proper image sizing
   - Use responsive images with srcset

3. **Reduce Bundle Size:**
   - Review and optimize JavaScript bundle
   - Implement code splitting
   - Lazy load non-critical components

### Configuration

The Lighthouse CI is now properly configured in `lighthouserc.json`:
- Running 1 test per URL
- Testing: `/nl/nl/pages`
- Desktop preset with realistic throttling
- Assertions for performance, accessibility, best practices, and SEO

## Next Steps

1. Address CLS issues (highest priority)
2. Optimize image loading
3. Review and optimize JavaScript bundle
4. Re-run audit to verify improvements
5. Set up continuous monitoring

## View Full Report

The detailed Lighthouse report is available at:
https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1763373129484-87851.report.html

## Running the Audit

```bash
# Run full performance audit
pnpm perf:audit

# Run just Lighthouse
pnpm lighthouse

# Build and analyze bundle
pnpm build:analyze
```
