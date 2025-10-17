const fs = require('fs');
const path = require('path');

// Simple conversion function using built-in Node.js
async function convertFonts() {
  try {
    // Try to install packages first
    const { exec } = require('child_process');
    
    console.log('Installing font conversion packages...');
    
    exec('npm install ttf2woff ttf2woff2 --no-save', (error, stdout, stderr) => {
      if (error) {
        console.log('Could not install packages automatically. Please run:');
        console.log('npm install ttf2woff ttf2woff2 --no-save');
        console.log('Then run this script again.');
        return;
      }
      
      console.log('Packages installed, starting conversion...');
      
      // Import the converters
      let ttf2woff, ttf2woff2;
      
      try {
        ttf2woff = require('ttf2woff');
        ttf2woff2 = require('ttf2woff2');
      } catch (e) {
        console.log('Conversion packages not found. Please install them manually:');
        console.log('npm install ttf2woff ttf2woff2 --no-save');
        return;
      }
      
      const fontsDir = path.join(__dirname, 'public', 'fonts');
      const ttfFiles = fs.readdirSync(fontsDir).filter(file => file.endsWith('.ttf'));
      
      console.log(`Found ${ttfFiles.length} TTF files to convert...`);
      
      ttfFiles.forEach(ttfFile => {
        const ttfPath = path.join(fontsDir, ttfFile);
        const baseName = path.basename(ttfFile, '.ttf');
        
        try {
          console.log(`Converting ${ttfFile}...`);
          
          // Read TTF file
          const ttfBuffer = fs.readFileSync(ttfPath);
          
          // Convert to WOFF
          const woffBuffer = ttf2woff(ttfBuffer);
          const woffPath = path.join(fontsDir, `${baseName}.woff`);
          fs.writeFileSync(woffPath, woffBuffer.buffer);
          console.log(`✓ Created: ${baseName}.woff`);
          
          // Convert to WOFF2
          const woff2Buffer = ttf2woff2(ttfBuffer);
          const woff2Path = path.join(fontsDir, `${baseName}.woff2`);
          fs.writeFileSync(woff2Path, woff2Buffer);
          console.log(`✓ Created: ${baseName}.woff2`);
          
        } catch (conversionError) {
          console.log(`✗ Error converting ${ttfFile}:`, conversionError.message);
        }
      });
      
      console.log('\n🎉 Font conversion completed!');
      console.log('Now updating CSS files to use the optimized fonts...');
      
      updateFontCSS(fontsDir);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function updateFontCSS(fontsDir) {
  // Update the fonts.css file with WOFF/WOFF2 support
  const fontsCSSPath = path.join(fontsDir, 'fonts.css');
  
  if (fs.existsSync(fontsCSSPath)) {
    let cssContent = fs.readFileSync(fontsCSSPath, 'utf8');
    
    // Update font-face declarations to include WOFF and WOFF2
    cssContent = cssContent.replace(
      /src: url\('\/fonts\/([^']+)\.ttf'\) format\('truetype'\);/g,
      "src: url('/fonts/$1.woff2') format('woff2'),\n       url('/fonts/$1.woff') format('woff'),\n       url('/fonts/$1.ttf') format('truetype');"
    );
    
    fs.writeFileSync(fontsCSSPath, cssContent);
    console.log('✓ Updated fonts.css with optimized font formats');
  }
  
  // Also update the main style.css
  const styleCSSPath = path.join(__dirname, 'style.css');
  if (fs.existsSync(styleCSSPath)) {
    let styleContent = fs.readFileSync(styleCSSPath, 'utf8');
    
    // Update the IranSansXVF font declaration
    styleContent = styleContent.replace(
      /src: url\("\.\/public\/fonts\/IRANSansXVF\.ttf"\) format\("truetype"\);/g,
      'src: url("./public/fonts/IRANSansXVF.woff2") format("woff2"),\n    url("./public/fonts/IRANSansXVF.woff") format("woff"),\n    url("./public/fonts/IRANSansXVF.ttf") format("truetype");'
    );
    
    fs.writeFileSync(styleCSSPath, styleContent);
    console.log('✓ Updated style.css with optimized font formats');
  }
}

// Run the conversion
convertFonts();