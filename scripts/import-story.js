#!/usr/bin/env node

/**
 * Storyblok Story Import Script
 * 
 * This script imports JSON data to create stories in Storyblok
 * Usage: node scripts/import-story.js
 */

const https = require('https');
const fs = require('fs');

// Configuration
const SPACE_ID = 'your_space_id'; // Replace with your space ID
const MANAGEMENT_TOKEN = 'your_management_token'; // Replace with your management token

/**
 * Import a story from JSON file
 */
async function importStory(jsonFilePath, storyName) {
  try {
    // Read JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    // Prepare story data
    const storyData = {
      story: {
        name: storyName || jsonData.story?.name || 'Imported Story',
        slug: jsonData.story?.slug || 'imported-story',
        content: jsonData.story?.content || jsonData,
        is_folder: false,
        published: false // Start as draft
      }
    };

    // API request options
    const postData = JSON.stringify(storyData);
    const options = {
      hostname: 'mapi.storyblok.com',
      port: 443,
      path: `/v1/spaces/${SPACE_ID}/stories`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Make API request
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 201) {
          const result = JSON.parse(data);
          console.log('✅ Story imported successfully!');
          console.log(`📄 Story ID: ${result.story.id}`);
          console.log(`🔗 Edit URL: https://app.storyblok.com/#!/me/spaces/${SPACE_ID}/stories/0/0/${result.story.id}`);
        } else {
          console.error('❌ Import failed:', res.statusCode);
          console.error('Response:', data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error);
    });

    req.write(postData);
    req.end();

  } catch (error) {
    console.error('❌ Error importing story:', error.message);
  }
}

/**
 * Extract content from template for easy import
 */
function extractContentForImport(templatePath, outputPath) {
  try {
    const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
    const contentOnly = template.story.content;
    
    fs.writeFileSync(outputPath, JSON.stringify(contentOnly, null, 2));
    console.log(`✅ Content extracted to: ${outputPath}`);
    console.log('📋 Copy this content and paste it into Storyblok JSON editor');
    
  } catch (error) {
    console.error('❌ Error extracting content:', error.message);
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'extract':
      extractContentForImport(
        './template-page-blocks.json',
        './template-content-only.json'
      );
      break;
      
    case 'import':
      const fileName = args[1] || './template-page-blocks.json';
      const storyName = args[2] || 'Template Page';
      console.log('🚀 Importing story...');
      console.log('⚠️  Make sure to set SPACE_ID and MANAGEMENT_TOKEN first!');
      importStory(fileName, storyName);
      break;
      
    default:
      console.log('📚 Usage:');
      console.log('  node scripts/import-story.js extract   # Extract content for manual import');
      console.log('  node scripts/import-story.js import [file] [name]   # Import via API');
      console.log('');
      console.log('💡 For manual import: use "extract" then copy the content to Storyblok');
  }
}

module.exports = { importStory, extractContentForImport };
