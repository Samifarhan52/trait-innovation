import glob
import re

files_processed = []

# 1. Process index.html
with open('templates/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Pattern for index.html: from <!-- 1. CINEMATIC BRAND INTRO OVERLAY to </header>
pattern_index = r'<!-- 1\. CINEMATIC BRAND INTRO OVERLAY.*?</header>'
new_index_content, count = re.subn(pattern_index, "{% include 'components/navbar.html' %}", index_content, flags=re.DOTALL)
if count > 0:
    # Also strip brand_intro.js script tag near bottom
    new_index_content = re.sub(r'<script src="[^"]*brand_intro\.js[^"]*"></script>\s*', '', new_index_content)
    with open('templates/index.html', 'w', encoding='utf-8') as f:
        f.write(new_index_content)
    files_processed.append('templates/index.html')
else:
    print("Warning: index.html pattern did not match!")

# 2. Process all service templates
service_templates = [
    'templates/advocatepro.html',
    'templates/ai_hospital.html',
    'templates/ai_support.html',
    'templates/aviation.html',
    'templates/data_agent.html',
    'templates/event_management.html',
    'templates/fashion_analytics.html',
    'templates/hire_ai.html',
    'templates/interview_coach.html',
]

pattern_header = r'<header.*?</header>'
for st in service_templates:
    with open(st, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content, count = re.subn(pattern_header, "{% include 'components/navbar.html' %}", content, flags=re.DOTALL)
    if count > 0:
        with open(st, 'w', encoding='utf-8') as f:
            f.write(new_content)
        files_processed.append(st)
    else:
        print(f"Warning: {st} header pattern did not match!")

print("Successfully processed templates:")
for p in files_processed:
    print(" -", p)
