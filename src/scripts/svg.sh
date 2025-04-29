#!/bin/bash

SVG_DIR="public/images/techs"
TARGET_VIEWBOX="0 0 100 100"

for file in "$SVG_DIR"/*.svg; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Otimiza e remove width/height usando o svgo.config.js
    svgo "$file" -o "$file"

    # Força o viewBox para TARGET_VIEWBOX
    xmlstarlet ed -L -u "//svg/@viewBox" -v "$TARGET_VIEWBOX" "$file"
  fi
done

echo "All SVGs processed and standardized!"