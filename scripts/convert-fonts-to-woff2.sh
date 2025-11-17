#!/bin/bash

# Script to convert OTF fonts to WOFF2 format for optimal web performance
# Requires: fonttools (pip install fonttools brotli)
#
# Usage: ./scripts/convert-fonts-to-woff2.sh

echo "🔄 Converting fonts to WOFF2 format..."

# Check if fonttools is installed
if ! command -v fonttools &> /dev/null; then
    echo "❌ fonttools not found. Installing..."
    echo "Run: pip install fonttools brotli"
    exit 1
fi

# Convert BelfiusMontserrat fonts
echo "Converting BelfiusMontserrat fonts..."
for font in public/fonts/belfius/*.otf; do
    if [[ ! "$font" =~ ^\._  ]]; then
        filename=$(basename "$font" .otf)
        echo "  Converting $filename..."
        fonttools ttLib.woff2 compress "$font" -o "public/fonts/belfius/${filename}.woff2"
    fi
done

# Convert BelfiusAlternative fonts
echo "Converting BelfiusAlternative fonts..."
for font in public/fonts1/belfius/*.otf; do
    if [[ ! "$font" =~ ^\._  ]]; then
        filename=$(basename "$font" .otf)
        echo "  Converting $filename..."
        fonttools ttLib.woff2 compress "$font" -o "public/fonts1/belfius/${filename}.woff2"
    fi
done

echo "✅ Font conversion complete!"
echo ""
echo "Next steps:"
echo "1. Verify WOFF2 files were created"
echo "2. Update src/lib/fonts.ts to use .woff2 extensions"
echo "3. Test font loading in the browser"
echo "4. Remove old OTF files after verification"
