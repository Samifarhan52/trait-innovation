import os, re

templates_dir = 'templates'
files = [f for f in os.listdir(templates_dir) if f.endswith('.html')]

print("=== TEMPLATE ANALYSIS ===")
for f in files:
    filepath = os.path.join(templates_dir, f)
    with open(filepath, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    # Check navbar inclusion
    has_global_nav = "{% include 'components/navbar.html' %}" in content or "navbar.html" in content
    
    # Check secondary nav
    has_secondary_nav = bool(re.search(r'id=["\'].*?service-nav["\']|<aside', content))
    aside_side = "None"
    if has_secondary_nav:
        if 'left-' in content or 'left:' in content or 'left-3' in content or 'left-4' in content or 'left-6' in content:
            aside_side = "Left"
        if 'right-' in content or 'right:' in content or 'right-4' in content or 'right-6' in content:
            if aside_side == "Left":
                aside_side = "Both/Mixed"
            else:
                aside_side = "Right"

    print(f"\nFile: {f}")
    print(f"  - Global Navbar: {has_global_nav}")
    print(f"  - Secondary Navbar: {has_secondary_nav} (Side: {aside_side})")

print("\nDone analysis.")
