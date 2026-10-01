import glob
import re

for t in sorted(glob.glob('templates/*.html')):
    content = open(t, encoding='utf-8').read()
    scripts = re.findall(r'<script src="([^"]+)"', content)
    print(t)
    for s in scripts:
        print("  -", s)
