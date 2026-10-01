import os, re

templates_dir = 'templates'
files = [f for f in os.listdir(templates_dir) if f.endswith('.html')]

anti_fouc_snippet = """  <!-- INSTANT ANTI-FOUC THEME HYDRATION (ZERO FLASH OF WHITE) -->
  <script>
    (function() {
      var saved = localStorage.getItem('trait_theme') || 'dark';
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    })();
  </script>
  <style>
    html.dark, html.dark body { background-color: #040814 !important; color: #ffffff !important; }
    html.light, html.light body { background-color: #F8FAFC !important; color: #0A0F1D !important; }
  </style>"""

print("=== APPLYING ANTI-FOUC THEME HYDRATION TO ALL TEMPLATES ===")

for f in files:
    filepath = os.path.join(templates_dir, f)
    with open(filepath, 'r', encoding='utf-8') as fp:
        content = fp.read()

    # Skip if already added
    if 'INSTANT ANTI-FOUC THEME HYDRATION' in content:
        print(f"File {f}: Already has anti-FOUC snippet.")
        continue

    # Insert right after <head>
    new_content = content.replace('<head>', f'<head>\n{anti_fouc_snippet}')

    # Also check html tag
    new_content = re.sub(r'<html\s+lang=["\']en["\']\s+class=["\'](light|dark)["\']>', '<html lang="en">', new_content)

    with open(filepath, 'w', encoding='utf-8') as fp:
        fp.write(new_content)

    print(f"Updated {f} with instant anti-FOUC hydration.")

print("\nDone applying Anti-FOUC script.")
