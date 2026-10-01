import urllib.request
import sys

routes = [
    '/',
    '/advocatepro-ai',
    '/ai-customer-support',
    '/ai-data-analysis',
    '/trait-hireai',
    '/ai-interview-coach',
    '/trait-event-management',
    '/trait-ai-fashion-analytics',
    '/trait-ai-aviation',
    '/trait-ai-hospital'
]

base_url = 'http://127.0.0.1:5000'
all_ok = True

for route in routes:
    url = base_url + route
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Python-Test'})
        with urllib.request.urlopen(req) as resp:
            status = resp.getcode()
            body = resp.read().decode('utf-8')
            has_navbar = 'GLOBAL REUSABLE TRAIT INNOVATION NAVBAR COMPONENT' in body or 'TRAIT INNOVATION' in body
            has_no_intro = 'id="brand-intro-overlay"' not in body
            print(f"[SUCCESS] {route} -> Status: {status}, Navbar Present: {has_navbar}, Intro Stripped: {has_no_intro}, Length: {len(body)}")
            if status != 200 or not has_navbar or not has_no_intro:
                all_ok = False
    except Exception as e:
        print(f"[FAIL] {route} -> Exception: {e}")
        all_ok = False

if all_ok:
    print("\nALL 10 ROUTES PASSED VERIFICATION PERFECTLY!")
else:
    print("\nSOME ROUTES FAILED VERIFICATION!")
    sys.exit(1)
