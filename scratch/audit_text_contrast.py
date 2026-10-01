import os, re

templates_dir = 'templates'
files = [f for f in os.listdir(templates_dir) if f.endswith('.html')]

print("=== TEXT COLOR CONTRAST AUDIT ===")

# Patterns to look for:
# 1. text-white or text-slate-100/200/300 without dark: on elements inside cards or sections
# 2. text-slate-900/800/700 without dark: on elements inside sections

for f in files:
    filepath = os.path.join(templates_dir, f)
    with open(filepath, 'r', encoding='utf-8') as fp:
        lines = fp.readlines()

    issues = []
    for idx, line in enumerate(lines, 1):
        # Look for text-white or text-slate-100/200/300 on non-button/non-badge elements that might be on light backgrounds
        if 'text-white' in line and 'dark:' not in line and 'bg-gradient' not in line and 'bg-blue' not in line and 'bg-slate-9' not in line and 'bg-black' not in line and 'bg-graphite' not in line and 'bg-talent' not in line and 'btn' not in line:
            # Check if this line is in a section or card that is white in light mode
            issues.append((idx, 'Potential invisible white text in light mode', line.strip()[:100]))
        
        if ('text-slate-900' in line or 'text-slate-800' in line or 'text-slate-700' in line) and 'dark:text' not in line:
            issues.append((idx, 'Potential invisible dark text in dark mode', line.strip()[:100]))

    print(f"\nFile: {f} (Found {len(issues)} potential contrast lines)")
    for line_num, msg, sample in issues[:8]: # Show first 8 per file
        print(f"  L{line_num}: [{msg}] -> {sample}")

print("\nAudit Complete.")
