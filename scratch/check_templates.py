import glob
import re

for t in sorted(glob.glob('templates/*.html')):
    if 'index' in t or 'navbar' in t:
        continue
    content = open(t, encoding='utf-8').read()
    ids = re.findall(r'id="([^"]+)"', content)
    print(t)
    print("  IDs:", ids)
