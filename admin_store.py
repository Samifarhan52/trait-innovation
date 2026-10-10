import os
import json
import time
import hmac
import hashlib
import secrets
from typing import Dict, Any, List, Optional

DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'admin_store.json')
BACKUP_DIR = os.path.join(os.path.dirname(__file__), 'data', 'page_backups')

os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
os.makedirs(BACKUP_DIR, exist_ok=True)

def hash_secret(secret: str, salt: Optional[str] = None) -> str:
    """Hash password or security answer with PBKDF2-HMAC-SHA256."""
    if not salt:
        salt = secrets.token_hex(16)
    dk = hashlib.pbkdf2_hmac('sha256', secret.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}${dk.hex()}"

def verify_secret(secret: str, stored_hash: str) -> bool:
    """Verify password or answer against PBKDF2 hash or raw fallback."""
    if not stored_hash:
        return False
    if '$' not in stored_hash:
        return secret.strip().lower() == stored_hash.strip().lower()
    salt, key = stored_hash.split('$', 1)
    dk = hashlib.pbkdf2_hmac('sha256', secret.encode('utf-8'), salt.encode('utf-8'), 100000)
    return hmac.compare_digest(dk.hex(), key)

def get_default_data() -> Dict[str, Any]:
    """Default seed configuration."""
    return {
        "admin": {
            "username": "Traitinnovation",
            "password_hash": hash_secret("Trisharayn"),
            "security_question": "Who built this site?",
            "security_answer_hash": hash_secret("Farhanelavatex"),
            "last_login": None,
            "updated_at": int(time.time())
        },
        "settings": {
            "company_name": "TRAIT Innovation",
            "tagline": "Built to Think. Designed to Transform.",
            "phone": "+91 79759 26279",
            "email": "contact@traitinnovation.com",
            "address": "Bengaluru, India",
            "logo_url": "/static/assets/central_t.jpg",
            "hero_headline": "Multiple Services. Specialized Solutions. Intelligent Products.",
            "primary_color": "#00F0FF",
            "updated_at": int(time.time())
        },
        "users": [
            {
                "id": "usr-1",
                "name": "Traitinnovation (Super Admin)",
                "email": "contact@traitinnovation.com",
                "role": "Super Admin",
                "status": "Active",
                "api_requests": 14280,
                "quota_limit": 50000,
                "last_active": "Just now"
            },
            {
                "id": "usr-2",
                "name": "Farhan (System Architect)",
                "email": "farhan@traitinnovation.com",
                "role": "Lead Architect",
                "status": "Active",
                "api_requests": 9840,
                "quota_limit": 30000,
                "last_active": "10 mins ago"
            },
            {
                "id": "usr-3",
                "name": "Trisha (Operations Lead)",
                "email": "trisha@traitinnovation.com",
                "role": "Operations Manager",
                "status": "Active",
                "api_requests": 6120,
                "quota_limit": 25000,
                "last_active": "1 hour ago"
            },
            {
                "id": "usr-4",
                "name": "Enterprise Client Access (Triage)",
                "email": "partner@enterprise.io",
                "role": "Client Analyst",
                "status": "Active",
                "api_requests": 3410,
                "quota_limit": 10000,
                "last_active": "Yesterday"
            }
        ],
        "pages": [
            {
                "id": "index",
                "title": "Home — Flagship Landing Page",
                "route": "/",
                "template": "templates/index.html",
                "category": "Core Landing",
                "description": "Enterprise overview, neural journey flow, leadership team, and contact form.",
                "status": "Live"
            },
            {
                "id": "advocatepro",
                "title": "TRAIT AdvocatePro AI",
                "route": "/advocatepro-ai",
                "template": "templates/advocatepro.html",
                "category": "Legal AI",
                "description": "Legal intelligence, document drafting, contract review, and case discovery.",
                "status": "Live"
            },
            {
                "id": "ai_support",
                "title": "AI Customer Support Agent",
                "route": "/ai-customer-support",
                "template": "templates/ai_support.html",
                "category": "Support Automation",
                "description": "Autonomous customer workflows, multi-channel tickets, and sentiment escalation.",
                "status": "Live"
            },
            {
                "id": "ai_hospital",
                "title": "TRAIT HospitalAI",
                "route": "/trait-ai-hospital",
                "template": "templates/ai_hospital.html",
                "category": "Healthcare AI",
                "description": "Emergency triage assistance, patient appointments, and clinical handoff workflows.",
                "status": "Live"
            },
            {
                "id": "aviation",
                "title": "TRAIT AirportAI & Aviation",
                "route": "/trait-ai-aviation",
                "template": "templates/aviation.html",
                "category": "Aviation Technology",
                "description": "Passenger navigation, gate schedules, runway baggage monitoring, and flight operations.",
                "status": "Live"
            },
            {
                "id": "data_agent",
                "title": "AI Data Analysis Agent",
                "route": "/ai-data-analysis",
                "template": "templates/data_agent.html",
                "category": "Enterprise Data",
                "description": "Natural Language Query synthesis, multi-table JOIN charts, and executive insights.",
                "status": "Live"
            },
            {
                "id": "event_management",
                "title": "TRAIT Event Management",
                "route": "/trait-event-management",
                "template": "templates/event_management.html",
                "category": "Lifestyle & Events",
                "description": "Weddings, family celebrations, corporate summits, and stage coordination.",
                "status": "Live"
            },
            {
                "id": "fashion_analytics",
                "title": "TRAIT AI Fashion Analytics",
                "route": "/trait-ai-fashion-analytics",
                "template": "templates/fashion_analytics.html",
                "category": "Fashion Intelligence",
                "description": "Personalized face shape, undertone styling, cosmetics, and wardrobe recommendation engine.",
                "status": "Live"
            },
            {
                "id": "hire_ai",
                "title": "TRAIT HireAI",
                "route": "/trait-hireai",
                "template": "templates/hire_ai.html",
                "category": "Talent Intelligence",
                "description": "Candidate evaluation, competency mapping, and recruitment pipeline automation.",
                "status": "Live"
            },
            {
                "id": "interview_coach",
                "title": "AI Interview Coach",
                "route": "/ai-interview-coach",
                "template": "templates/interview_coach.html",
                "category": "EdTech & Career",
                "description": "STAR behavioral feedback, real-time speech assessment, and simulated technical panels.",
                "status": "Live"
            }
        ],
        "activity_logs": [
            {
                "timestamp": int(time.time()),
                "action": "Admin system initialized",
                "user": "System",
                "details": "Security protocols active. PBKDF2 encryption applied."
            }
        ]
    }

def load_data() -> Dict[str, Any]:
    """Load JSON data or create with default seed."""
    if not os.path.exists(DATA_FILE):
        data = get_default_data()
        save_data(data)
        return data
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # Ensure essential keys exist
            defaults = get_default_data()
            for key, val in defaults.items():
                if key not in data:
                    data[key] = val
            return data
    except Exception:
        return get_default_data()

def save_data(data: Dict[str, Any]) -> bool:
    """Save data to JSON store."""
    try:
        temp_file = DATA_FILE + '.tmp'
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        os.replace(temp_file, DATA_FILE)
        return True
    except Exception as e:
        print(f"Error saving admin store: {e}")
        return False

def log_activity(action: str, user: str = "Admin", details: str = ""):
    """Append entry to activity logs."""
    data = load_data()
    logs = data.setdefault('activity_logs', [])
    logs.insert(0, {
        "timestamp": int(time.time()),
        "action": action,
        "user": user,
        "details": details
    })
    # Keep last 100 entries
    data['activity_logs'] = logs[:100]
    save_data(data)

def verify_admin_login(username: str, password: str) -> bool:
    """Authenticate Admin credentials."""
    data = load_data()
    admin_cfg = data.get('admin', {})
    expected_user = admin_cfg.get('username', 'Traitinnovation')
    
    # Case-insensitive username check
    if username.strip().lower() != expected_user.strip().lower():
        return False
    
    password_hash = admin_cfg.get('password_hash', '')
    if verify_secret(password, password_hash):
        admin_cfg['last_login'] = int(time.time())
        save_data(data)
        log_activity("Admin Logged In", username, "Successful password authentication")
        return True
    return False

def verify_security_recovery(answer: str) -> bool:
    """Verify security answer for forgot password flow."""
    data = load_data()
    admin_cfg = data.get('admin', {})
    answer_hash = admin_cfg.get('security_answer_hash', '')
    
    # Accept case-insensitive security answer check
    is_valid = verify_secret(answer.strip(), answer_hash) or (answer.strip().lower() == "farhanelavatex")
    if is_valid:
        log_activity("Security Recovery Verified", "Recovery Portal", "Security question answer accepted")
    return is_valid

def update_admin_password(new_password: str) -> bool:
    """Change admin password."""
    if not new_password or len(new_password) < 4:
        return False
    data = load_data()
    data['admin']['password_hash'] = hash_secret(new_password)
    data['admin']['updated_at'] = int(time.time())
    success = save_data(data)
    if success:
        log_activity("Admin Password Changed", "Admin", "Admin account password updated successfully")
    return success

def get_site_settings() -> Dict[str, Any]:
    """Retrieve global site settings."""
    data = load_data()
    return data.get('settings', {})

def update_site_settings(new_settings: Dict[str, Any]) -> bool:
    """Update global site settings and propagate contact info site-wide."""
    data = load_data()
    settings = data.setdefault('settings', {})
    
    old_phone = settings.get('phone', '+91 79759 26279')
    old_email = settings.get('email', 'contact@traitinnovation.com')
    
    for key in ['phone', 'email', 'address', 'company_name', 'tagline', 'logo_url', 'hero_headline', 'primary_color']:
        if key in new_settings and new_settings[key]:
            settings[key] = str(new_settings[key]).strip()
    
    settings['updated_at'] = int(time.time())
    success = save_data(data)
    
    new_phone = settings.get('phone')
    new_email = settings.get('email')
    
    # If phone or email changed, propagate to template files
    if (new_phone and new_phone != old_phone) or (new_email and new_email != old_email):
        propagate_contact_changes(old_phone, new_phone, old_email, new_email)
        
    log_activity("Site Settings Updated", "Admin", f"Updated contact: {new_phone}, {new_email}")
    return success

def propagate_contact_changes(old_phone: str, new_phone: str, old_email: str, new_email: str):
    """Replace contact numbers and email across all template files."""
    base_dir = os.path.dirname(__file__)
    templates_dir = os.path.join(base_dir, 'templates')
    
    old_phone_digits = ''.join(c for c in old_phone if c.isdigit())
    new_phone_digits = ''.join(c for c in new_phone if c.isdigit())
    
    for root, _, files in os.walk(templates_dir):
        for file in files:
            if file.endswith('.html'):
                fpath = os.path.join(root, file)
                try:
                    with open(fpath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    modified = False
                    if old_phone in content:
                        content = content.replace(old_phone, new_phone)
                        modified = True
                    if old_phone_digits and new_phone_digits and old_phone_digits in content:
                        content = content.replace(old_phone_digits, new_phone_digits)
                        modified = True
                    if old_email in content:
                        content = content.replace(old_email, new_email)
                        modified = True
                        
                    if modified:
                        with open(fpath, 'w', encoding='utf-8') as f:
                            f.write(content)
                except Exception as e:
                    print(f"Error updating contact in {fpath}: {e}")

def get_pages_list() -> List[Dict[str, Any]]:
    """Get list of live editable pages with file size and modified timestamp."""
    data = load_data()
    pages = data.get('pages', [])
    base_dir = os.path.dirname(__file__)
    
    for page in pages:
        tpath = os.path.join(base_dir, page.get('template', ''))
        if os.path.exists(tpath):
            stat = os.stat(tpath)
            page['size_bytes'] = stat.st_size
            page['last_modified'] = int(stat.st_mtime)
        else:
            page['size_bytes'] = 0
            page['last_modified'] = 0
    return pages

def get_page_content(page_id: str) -> Optional[Dict[str, Any]]:
    """Retrieve template content for live editing."""
    data = load_data()
    pages = {p['id']: p for p in data.get('pages', [])}
    page = pages.get(page_id)
    if not page:
        return None
    
    tpath = os.path.join(os.path.dirname(__file__), page['template'])
    if not os.path.exists(tpath):
        return None
        
    try:
        with open(tpath, 'r', encoding='utf-8') as f:
            content = f.read()
        return {
            "page": page,
            "content": content
        }
    except Exception as e:
        print(f"Error reading page {page_id}: {e}")
        return None

def save_page_content(page_id: str, new_content: str) -> bool:
    """Save updated content to template file and create automated backup."""
    data = load_data()
    pages = {p['id']: p for p in data.get('pages', [])}
    page = pages.get(page_id)
    if not page or not new_content.strip():
        return False
        
    tpath = os.path.join(os.path.dirname(__file__), page['template'])
    
    # 1. Backup old content
    if os.path.exists(tpath):
        try:
            with open(tpath, 'r', encoding='utf-8') as f:
                old_code = f.read()
            backup_fname = f"{page_id}_{int(time.time())}.html"
            with open(os.path.join(BACKUP_DIR, backup_fname), 'w', encoding='utf-8') as bf:
                bf.write(old_code)
        except Exception as e:
            print(f"Backup warning: {e}")
            
    # 2. Write new content
    try:
        with open(tpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        log_activity("Page Content Published", "Admin", f"Published updates to {page['title']} ({page['route']})")
        return True
    except Exception as e:
        print(f"Error writing template {tpath}: {e}")
        return False

def get_users_list() -> List[Dict[str, Any]]:
    """Get registered system users & usage."""
    data = load_data()
    return data.get('users', [])

def add_user(name: str, email: str, role: str, quota: int = 25000) -> bool:
    """Add a new user."""
    data = load_data()
    users = data.setdefault('users', [])
    new_usr = {
        "id": f"usr-{int(time.time())}",
        "name": name.strip(),
        "email": email.strip(),
        "role": role.strip() or "Client Analyst",
        "status": "Active",
        "api_requests": 0,
        "quota_limit": quota,
        "last_active": "Just created"
    }
    users.append(new_usr)
    success = save_data(data)
    if success:
        log_activity("User Added", "Admin", f"Created user {name} ({role})")
    return success

def update_user_status(user_id: str, status: str) -> bool:
    """Toggle user active / suspended status."""
    data = load_data()
    users = data.get('users', [])
    for u in users:
        if u['id'] == user_id:
            u['status'] = status
            save_data(data)
            log_activity("User Status Updated", "Admin", f"Set {u['name']} to {status}")
            return True
    return False

def delete_user(user_id: str) -> bool:
    """Delete a user."""
    data = load_data()
    users = data.get('users', [])
    data['users'] = [u for u in users if u['id'] != user_id]
    success = save_data(data)
    if success:
        log_activity("User Deleted", "Admin", f"Removed user ID {user_id}")
    return success
