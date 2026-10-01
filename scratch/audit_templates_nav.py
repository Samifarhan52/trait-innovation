import os, re

templates_dir = 'templates'
files = [f for f in os.listdir(templates_dir) if f.endswith('.html') and f != 'index.html']

print("=== TEMPLATE SECONDARY NAV HOVER AUDIT ===")

for f in files:
    filepath = os.path.join(templates_dir, f)
    with open(filepath, 'r', encoding='utf-8') as fp:
        content = fp.read()

    has_aside = '<aside' in content
    has_group = 'group' in content
    has_nav_js = 'service_nav.js' in content
    has_sidebar_text = 'sidebar-text-content' in content or 'group-hover:opacity-100' in content

    print(f"\nFile: {f}")
    print(f"  - Aside Present: {has_aside}")
    print(f"  - Group Hover Class: {has_group}")
    print(f"  - Nav JS Included: {has_nav_js}")
    print(f"  - Text Elements Marked: {has_sidebar_text}")

print("\nDone audit.")
