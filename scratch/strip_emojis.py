import glob
import re

emoji_pattern = re.compile(r'[\u2600-\u26FF\u2700-\u27BF\U0001F300-\U0001F6FF\U0001F900-\U0001F9FF\U0001F680-\U0001F6FF]')

# Specific emoji replacements mapping to clean SVGs or text
replacements = {
    '✨': '',
    '🚀': '',
    '🤖': '',
    '🏥': '',
    '✈️': '',
    '👔': '',
    '⚖️': '',
    '🎯': '',
    '📊': '',
    '🧠': '',
    '💡': '',
    '🛡️': '',
    '📍': '',
    '📞': '',
    '✉️': '',
    '✉': '',
    '🔒': '',
    '💎': '',
    '🎉': '',
    '🥂': '',
    '💍': '',
    '🎓': '',
    '🏢': '',
    '📋': '',
    '🌿': '',
    '🎨': '',
    '🔊': '',
    '⚡': '',
    '★': '',
    '⭐': '',
    '➔': '',
    '➡️': '',
    '❌': '',
    '✖': '',
    '✕': '',
    '✓': '',
    '✔': '',
    '☀️': '',
    '🌙': ''
}

template_files = glob.glob('templates/*.html')

for filepath in template_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Remove emojis
    cleaned = emoji_pattern.sub('', content)

    if cleaned != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(cleaned)
        print(f"Cleaned emojis from {filepath}")
    else:
        print(f"No emojis found in {filepath}")
