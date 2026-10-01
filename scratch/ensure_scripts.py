import glob
import re

templates = glob.glob('templates/*.html')

for t in sorted(templates):
    with open(t, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # Check for main.js
    if "js/main.js" not in content:
        main_script = "<script src=\"{{ url_for('static', filename='js/main.js') }}\"></script>\n"
        content = content.replace('</body>', main_script + '</body>')
        changed = True

    # Check for service_nav.js (only on service templates, not index or navbar)
    if "index.html" not in t and "navbar.html" not in t and "js/service_nav.js" not in content:
        nav_script = "<script src=\"{{ url_for('static', filename='js/service_nav.js') }}\"></script>\n"
        content = content.replace('</body>', nav_script + '</body>')
        changed = True

    if changed:
        with open(t, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated scripts in:", t)
