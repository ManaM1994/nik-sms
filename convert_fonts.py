#!/usr/bin/env python3
import os
import subprocess
import sys

def install_fonttools():
    """Install fonttools if not already installed"""
    try:
        import fontTools
        print("fontTools already installed")
        return True
    except ImportError:
        print("Installing fontTools...")
        result = subprocess.run([sys.executable, "-m", "pip", "install", "--user", "fonttools", "brotli", "zopfli"], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("fontTools installed successfully")
            return True
        else:
            print(f"Failed to install fontTools: {result.stderr}")
            return False

def convert_ttf_to_woff2_and_woff(ttf_path):
    """Convert TTF to WOFF2 and WOFF formats"""
    try:
        from fontTools.ttLib import TTFont
        from fontTools.woff2 import compress as woff2_compress
        import io
        
        # Load the TTF font
        font = TTFont(ttf_path)
        
        # Generate WOFF2
        woff2_path = ttf_path.replace('.ttf', '.woff2')
        font.flavor = 'woff2'
        font.save(woff2_path)
        print(f"✓ Created: {woff2_path}")
        
        # Generate WOFF
        woff_path = ttf_path.replace('.ttf', '.woff')
        font.flavor = 'woff'
        font.save(woff_path)
        print(f"✓ Created: {woff_path}")
        
        return True
    except Exception as e:
        print(f"✗ Error converting {ttf_path}: {str(e)}")
        return False

def main():
    # Install fonttools if needed
    if not install_fonttools():
        print("Cannot proceed without fonttools. Please install it manually:")
        print("pip3 install --user fonttools brotli zopfli")
        return
    
    fonts_dir = "/Users/mana/Documents/nik-sms/public/fonts"
    
    if not os.path.exists(fonts_dir):
        print(f"Fonts directory not found: {fonts_dir}")
        return
    
    # Find all TTF files
    ttf_files = [f for f in os.listdir(fonts_dir) if f.endswith('.ttf')]
    
    if not ttf_files:
        print("No TTF files found in the fonts directory")
        return
    
    print(f"Found {len(ttf_files)} TTF files to convert...")
    
    # Convert each TTF file
    for ttf_file in ttf_files:
        ttf_path = os.path.join(fonts_dir, ttf_file)
        print(f"\nConverting: {ttf_file}")
        convert_ttf_to_woff2_and_woff(ttf_path)
    
    print(f"\n🎉 Font conversion completed!")
    print(f"Check the {fonts_dir} directory for the new WOFF and WOFF2 files.")

if __name__ == "__main__":
    main()