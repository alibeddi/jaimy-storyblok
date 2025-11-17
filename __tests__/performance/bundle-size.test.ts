/**
 * Bundle size regression tests
 */

import fs from 'fs';
import path from 'path';

describe('Bundle Size Regression', () => {
  const budgets = {
    maxJSSize: 560, // KB - 30% reduction target
    maxCSSSize: 112, // KB - 25% reduction target
  };

  it('should not exceed JavaScript bundle size budget', () => {
    const manifestPath = path.join(process.cwd(), '.next', 'build-manifest.json');
    
    if (!fs.existsSync(manifestPath)) {
      console.warn('Build manifest not found - skipping test');
      return;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    let totalJS = 0;
    Object.values(manifest.pages).forEach((files: any) => {
      files.forEach((file: string) => {
        if (file.endsWith('.js')) {
          const filePath = path.join(process.cwd(), '.next', file);
          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            totalJS += stats.size / 1024; // Convert to KB
          }
        }
      });
    });

    console.log(`Total JavaScript bundle size: ${totalJS.toFixed(2)} KB`);
    expect(totalJS).toBeLessThan(budgets.maxJSSize);
  });

  it('should not exceed CSS bundle size budget', () => {
    const manifestPath = path.join(process.cwd(), '.next', 'build-manifest.json');
    
    if (!fs.existsSync(manifestPath)) {
      console.warn('Build manifest not found - skipping test');
      return;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    let totalCSS = 0;
    Object.values(manifest.pages).forEach((files: any) => {
      files.forEach((file: string) => {
        if (file.endsWith('.css')) {
          const filePath = path.join(process.cwd(), '.next', file);
          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            totalCSS += stats.size / 1024; // Convert to KB
          }
        }
      });
    });

    console.log(`Total CSS bundle size: ${totalCSS.toFixed(2)} KB`);
    expect(totalCSS).toBeLessThan(budgets.maxCSSSize);
  });
});
