# Font Conversion Instructions

## ✅ Current Status

Your Persian fonts are now correctly set up in your project:

- ✅ **Font Files**: All IRANSans TTF fonts are in `/public/fonts/`
- ✅ **Font CSS**: Comprehensive font setup in `/public/fonts/fonts.css`
- ✅ **Font Integration**: Fonts are loaded in `index.html` and `style.css`
- ✅ **RTL Support**: Proper Persian text direction and alignment
- ✅ **Variable Font**: IRANSansXVF.ttf with weight range 100-900
- ✅ **Static Fonts**: Individual weight files for fallback support

## 📝 Font Setup Summary

### Fonts Currently Available:

- `IRANSansX` (Variable font: 100-900 weight)
- `IRANSansXFaNum` (Static fonts with specific weights):
  - UltraLight (100)
  - Thin (200)
  - Regular (400)
  - Medium (500)
  - DemiBold (600)
  - Bold (700)
  - ExtraBold (800)
  - Black (900)
  - Heavy (950)
  - ExtraBlack (1000)

### Usage in CSS:

```css
/* Use the variable font (recommended) */
font-family: "IRANSansX", "IRANSansXFaNum", sans-serif;

/* Or use predefined CSS variables */
font-family: var(--font-family-primary);
font-family: var(--font-family-persian);

/* Font weight classes available */
.font-ultralight {
  font-weight: 100;
}
.font-thin {
  font-weight: 200;
}
.font-regular {
  font-weight: 400;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.font-bold {
  font-weight: 700;
}
.font-extrabold {
  font-weight: 800;
}
.font-black {
  font-weight: 900;
}
```

## 🚀 To Convert TTF to WOFF/WOFF2 (Optional Optimization)

### Method 1: Online Conversion (Easiest)

1. Visit: https://convertio.co/ttf-woff2/ or https://cloudconvert.com/ttf-to-woff2
2. Upload your TTF files from `/public/fonts/`
3. Download the WOFF and WOFF2 files
4. Place them back in `/public/fonts/`

### Method 2: Using fonttools (Command Line)

```bash
# Install fonttools
pip3 install fonttools brotli

# Convert TTF to WOFF2
pyftsubset public/fonts/IRANSansXVF.ttf --output-file=public/fonts/IRANSansXVF.woff2 --flavor=woff2

# Convert TTF to WOFF
pyftsubset public/fonts/IRANSansXVF.ttf --output-file=public/fonts/IRANSansXVF.woff --flavor=woff
```

### Method 3: Using woff2 tools

```bash
# Install woff2 tools
brew install woff2  # On macOS

# Convert to WOFF2
woff2_compress public/fonts/IRANSansXVF.ttf

# This creates IRANSansXVF.woff2 automatically
```

## 🔄 After Creating WOFF/WOFF2 Files

Once you have WOFF and WOFF2 files, update the font CSS to use all formats for better performance:

In `/public/fonts/fonts.css`, change lines like:

```css
src: url("/fonts/IRANSansXVF.ttf") format("truetype");
```

To:

```css
src: url("/fonts/IRANSansXVF.woff2") format("woff2"), url("/fonts/IRANSansXVF.woff")
    format("woff"), url("/fonts/IRANSansXVF.ttf") format("truetype");
```

## 📊 Performance Benefits

- **WOFF2**: ~30% smaller than TTF, best compression
- **WOFF**: ~20% smaller than TTF, wider browser support
- **TTF**: Fallback for older browsers

## 🌐 Browser Support

- **Variable Fonts**: Modern browsers (Chrome 62+, Firefox 62+, Safari 11+)
- **WOFF2**: Chrome 36+, Firefox 39+, Safari 12+
- **WOFF**: All modern browsers
- **TTF**: Universal support (your current setup)

Your fonts are working perfectly now! The WOFF conversion is optional for optimization.
