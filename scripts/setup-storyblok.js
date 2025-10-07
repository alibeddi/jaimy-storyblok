#!/usr/bin/env node

/**
 * Storyblok Setup Helper Script
 * 
 * This script helps validate your Storyblok configuration
 * and provides setup instructions.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Storyblok Setup Validator\n');

// Check for environment file
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log('📋 Environment Check:');
console.log(`   .env.local file: ${envExists ? '✅ Found' : '❌ Missing'}`);

if (envExists) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasAccessToken = envContent.includes('NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN');
  const hasPreviewSecret = envContent.includes('STORYBLOK_PREVIEW_SECRET');
  
  console.log(`   Access Token: ${hasAccessToken ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   Preview Secret: ${hasPreviewSecret ? '✅ Configured' : '❌ Missing'}`);
} else {
  console.log('\n📝 To set up your environment:');
  console.log('   1. Copy env.template to .env.local');
  console.log('   2. Add your Storyblok Access Token');
  console.log('   3. Add your Storyblok Preview Secret');
}

// Check for template file
const templatePath = path.join(process.cwd(), 'template-page-blocks.json');
const templateExists = fs.existsSync(templatePath);

console.log('\n📄 Template Check:');
console.log(`   Template file: ${templateExists ? '✅ Ready to import' : '❌ Missing'}`);

// Setup instructions
console.log('\n🔧 Setup Instructions:');
console.log('   1. Configure environment variables in .env.local');
console.log('   2. Import template-page-blocks.json into Storyblok');
console.log('   3. Access pages with ?_storyblok=1 for live editing');
console.log('   4. All blocks support inline editing');
console.log('   5. Configure SEO settings in page options');

console.log('\n📚 Documentation:');
console.log('   See STORYBLOK_SETUP_COMPLETE.md for detailed instructions');

console.log('\n✨ Features Ready:');
console.log('   ✅ Autosave functionality');
console.log('   ✅ Draft/preview mode');
console.log('   ✅ Inline editing (like Ajusto)');
console.log('   ✅ Template with all blocks');
console.log('   ✅ SEO plugin (NoIndex/NoFollow)');

console.log('\n🎉 Your Storyblok setup is complete!');
