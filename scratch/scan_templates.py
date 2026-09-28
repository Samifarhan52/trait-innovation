import glob
import re

template_files = glob.glob('templates/*.html')
print(f'Found {len(template_files)} template files.')

emoji_pattern = re.compile(r'[\u2600-\u26FF\u2700-\u27BF\U0001F300-\U0001F6FF\U0001F900-\U0001F9FF\U0001F680-\U0001F6FF]')

for filepath in template_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    building_matches = re.findall(r'BUILDING WHAT[^\n<"]*', content, re.IGNORECASE)
    emojis = emoji_pattern.findall(content)
    
    print(f"\n--- {filepath} ---")
    if building_matches:
        print("  Found 'BUILDING WHAT':", building_matches)
    if emojis:
        emoji_hex = [hex(ord(c)) for c in set(emojis)]
        print(f"  Found {len(emojis)} emojis (unicodes):", emoji_hex)
