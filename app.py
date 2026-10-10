import os
from flask import Flask, render_template, request, jsonify, redirect, url_for, send_from_directory, session
import admin_store

app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = os.environ.get('SECRET_KEY', 'trait-innovation-admin-console-secret-2026')
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.after_request
def add_header(response):
    """Disable browser caching for development/testing so updates appear immediately."""
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/')
def index():
    """Render main landing page."""
    return render_template('index.html')

@app.route('/advocatepro-ai')
@app.route('/advocatepro')
def advocatepro():
    """Render dedicated AdvocatePro AI product page."""
    return render_template('advocatepro.html')

@app.route('/videos/<path:filename>')
def serve_videos(filename):
    """Serve video assets from root videos folder."""
    from flask import send_from_directory
    return send_from_directory('videos', filename)

@app.route('/ai-customer-support')
@app.route('/ai-support')
def ai_customer_support():
    """Render dedicated AI Customer Support Agent product page."""
    return render_template('ai_support.html')

@app.route('/ai-data-analysis')
@app.route('/data-agent')
def data_agent():
    """Render dedicated AI Data Analysis Agent product page."""
    return render_template('data_agent.html')

@app.route('/trait-hireai')
@app.route('/hire-ai')
def hire_ai():
    """Render dedicated TRAIT HireAI HR technology product page."""
    return render_template('hire_ai.html')

@app.route('/ai-interview-coach')
@app.route('/interview-coach')
def interview_coach():
    """Render dedicated AI Interview Coach product page."""
    return render_template('interview_coach.html')

@app.route('/trait-event-management')
@app.route('/event-management')
def event_management():
    """Render dedicated TRAIT Event Management service page."""
    return render_template('event_management.html')

@app.route('/trait-ai-fashion-analytics')
@app.route('/fashion-analytics')
@app.route('/fashion-analysis')
@app.route('/fashion')
def fashion_analytics():
    """Render dedicated TRAIT AI Fashion Analytics service page."""
    return render_template('fashion_analytics.html')

@app.route('/trait-ai-aviation')
@app.route('/ai-aviation')
@app.route('/aviation')
@app.route('/trait-airport-ai')
@app.route('/airport-ai')
@app.route('/trait-aviation-analytics')
@app.route('/aviation-analytics')
def ai_aviation():
    """Render unified TRAIT AI Aviation service page (combines AirportAI + Aviation Analytics)."""
    return render_template('aviation.html')

@app.route('/trait-ai-hospital')
@app.route('/ai-hospital')
def ai_hospital():
    """Render dedicated TRAIT AI Hospital service page."""
    return render_template('ai_hospital.html')

@app.route('/robots.txt')
@app.route('//robots.txt')
def robots():
    """Serve robots.txt for search engines."""
    resp = send_from_directory('static', 'robots.txt', mimetype='text/plain')
    resp.headers['Cache-Control'] = 'public, max-age=3600'
    return resp

@app.route('/sitemap.xml')
@app.route('//sitemap.xml')
def sitemap():
    """Serve sitemap.xml for Google Search Console and crawlers."""
    resp = send_from_directory('static', 'sitemap.xml', mimetype='application/xml')
    resp.headers['Cache-Control'] = 'public, max-age=3600'
    return resp

@app.route('/googlecbf9d8cbd657bf05.html')
@app.route('/google<hash_val>.html')
def google_verification(hash_val=None):
    """Serve Google Search Console ownership verification file."""
    filename = f"google{hash_val}.html" if hash_val else "googlecbf9d8cbd657bf05.html"
    return send_from_directory('static', filename, mimetype='text/html')

@app.route('/favicon.ico')
@app.route('//favicon.ico')
def favicon():
    """Serve standard favicon.ico directly at root."""
    resp = send_from_directory('static', 'favicon.ico', mimetype='image/x-icon')
    resp.headers['Cache-Control'] = 'public, max-age=86400'
    return resp

@app.route('/favicon.svg')
@app.route('//favicon.svg')
def favicon_svg():
    """Serve vector SVG favicon directly at root."""
    resp = send_from_directory('static', 'favicon.svg', mimetype='image/svg+xml')
    resp.headers['Cache-Control'] = 'public, max-age=86400'
    return resp

@app.route('/apple-touch-icon.png')
@app.route('//apple-touch-icon.png')
def apple_touch_icon():
    """Serve iOS apple-touch-icon.png directly at root."""
    resp = send_from_directory('static', 'apple-touch-icon.png', mimetype='image/png')
    resp.headers['Cache-Control'] = 'public, max-age=86400'
    return resp

@app.route('/site.webmanifest')
@app.route('//site.webmanifest')
def site_webmanifest():
    """Serve web manifest for mobile / PWA installability."""
    resp = send_from_directory('static', 'site.webmanifest', mimetype='application/manifest+json')
    resp.headers['Cache-Control'] = 'public, max-age=86400'
    return resp

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions."""
    data = request.get_json() or {}
    name = data.get('name', 'Valued Client')
    email = data.get('email', '')
    service = data.get('service', 'General Inquiry')
    message = data.get('message', '')

    if not email:
        return jsonify({'status': 'error', 'message': 'Email address is required.'}), 400

    return jsonify({
        'status': 'success',
        'message': f'Thank you {name}! Your inquiry regarding {service} has been received. Our team will contact you at {email} within 24 hours.'
    })

# ================= ADMIN CONSOLE & CMS CONTROLLERS =================

def is_admin_authenticated():
    return session.get('admin_logged_in') is True

@app.route('/admin')
@app.route('/admin/')
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    """Admin login and authentication gateway."""
    if request.method == 'GET':
        if is_admin_authenticated():
            return redirect('/admin/dashboard')
        return render_template('admin/login.html')

    # Handle POST login authentication
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')

    if admin_store.verify_admin_login(username, password):
        session['admin_logged_in'] = True
        session['admin_user'] = username
        return jsonify({'status': 'success', 'redirect': '/admin/dashboard'})
    
    return jsonify({'status': 'error', 'message': 'Invalid administrator ID or password.'}), 401

@app.route('/admin/forgot-password', methods=['POST'])
def admin_forgot_password():
    """Confidential security recovery protocol."""
    data = request.get_json() or {}
    answer = data.get('answer', '').strip()
    new_password = data.get('new_password', '')

    if admin_store.verify_security_recovery(answer):
        if new_password:
            admin_store.update_admin_password(new_password)
        session['admin_logged_in'] = True
        session['admin_user'] = 'Traitinnovation'
        return jsonify({'status': 'success', 'redirect': '/admin/dashboard'})

    return jsonify({'status': 'error', 'message': 'Incorrect security answer.'}), 403

@app.route('/admin/logout')
def admin_logout():
    """End admin session."""
    session.clear()
    return redirect('/admin/login')

@app.route('/admin/dashboard')
def admin_dashboard():
    """Master Admin Console dashboard."""
    if not is_admin_authenticated():
        return redirect('/admin/login')
    return render_template('admin/dashboard.html')

@app.route('/admin/api/state', methods=['GET'])
def admin_api_state():
    """Return consolidated state for admin dashboard."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    full_data = admin_store.load_data()
    return jsonify({
        'status': 'success',
        'pages': admin_store.get_pages_list(),
        'settings': admin_store.get_site_settings(),
        'users': admin_store.get_users_list(),
        'activity_logs': full_data.get('activity_logs', [])
    })

@app.route('/admin/api/pages/<page_id>', methods=['GET', 'POST'])
def admin_api_page_content(page_id):
    """Retrieve or save template code for live page."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    if request.method == 'GET':
        page_data = admin_store.get_page_content(page_id)
        if not page_data:
            return jsonify({'status': 'error', 'message': 'Page not found'}), 404
        return jsonify({'status': 'success', **page_data})
    
    # POST save page
    data = request.get_json() or {}
    content = data.get('content', '')
    if not content:
        return jsonify({'status': 'error', 'message': 'Content cannot be empty'}), 400
        
    if admin_store.save_page_content(page_id, content):
        return jsonify({'status': 'success', 'message': 'Page published successfully'})
    return jsonify({'status': 'error', 'message': 'Failed to write template file'}), 500

@app.route('/admin/api/settings', methods=['POST'])
def admin_api_save_settings():
    """Update global site settings and propagate contact info."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    data = request.get_json() or {}
    if admin_store.update_site_settings(data):
        return jsonify({'status': 'success', 'message': 'Site settings updated successfully'})
    return jsonify({'status': 'error', 'message': 'Failed to update settings'}), 500

@app.route('/admin/api/upload', methods=['POST'])
def admin_api_upload():
    """Upload media image to static assets."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded'}), 400
        
    file = request.files['file']
    if not file or file.filename == '':
        return jsonify({'status': 'error', 'message': 'Empty file'}), 400
        
    import re
    clean_name = re.sub(r'[^a-zA-Z0-9_.-]', '_', os.path.basename(file.filename))
    upload_dir = os.path.join(os.path.dirname(__file__), 'static', 'uploads')
    os.makedirs(upload_dir, exist_ok=True)
    
    save_path = os.path.join(upload_dir, clean_name)
    file.save(save_path)
    
    url = f"/static/uploads/{clean_name}"
    admin_store.log_activity("Media Asset Uploaded", "Admin", f"Saved {clean_name} to {url}")
    return jsonify({'status': 'success', 'url': url, 'filename': clean_name})

@app.route('/admin/api/users', methods=['POST'])
def admin_api_add_user():
    """Register new system user."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    role = data.get('role', 'Client Analyst')
    quota = int(data.get('quota', 25000))

    if not name or not email:
        return jsonify({'status': 'error', 'message': 'Name and Email are required'}), 400

    if admin_store.add_user(name, email, role, quota):
        return jsonify({'status': 'success', 'message': 'User added'})
    return jsonify({'status': 'error', 'message': 'Failed to add user'}), 500

@app.route('/admin/api/users/<user_id>/status', methods=['POST'])
def admin_api_user_status(user_id):
    """Toggle user active / suspended status."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    data = request.get_json() or {}
    status = data.get('status', 'Active')
    if admin_store.update_user_status(user_id, status):
        return jsonify({'status': 'success', 'message': f'Status updated to {status}'})
    return jsonify({'status': 'error', 'message': 'Failed to update user status'}), 500

@app.route('/admin/api/users/<user_id>', methods=['DELETE'])
def admin_api_delete_user(user_id):
    """Remove user from directory."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    if admin_store.delete_user(user_id):
        return jsonify({'status': 'success', 'message': 'User removed'})
    return jsonify({'status': 'error', 'message': 'Failed to remove user'}), 500

@app.route('/admin/api/change-password', methods=['POST'])
def admin_api_change_password():
    """Change admin password with current password confirmation."""
    if not is_admin_authenticated():
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
    
    data = request.get_json() or {}
    current_password = data.get('current_password', '')
    new_password = data.get('new_password', '')

    if not admin_store.verify_admin_login('Traitinnovation', current_password):
        return jsonify({'status': 'error', 'message': 'Current password is incorrect'}), 400

    if admin_store.update_admin_password(new_password):
        return jsonify({'status': 'success', 'message': 'Password updated successfully'})
    return jsonify({'status': 'error', 'message': 'Failed to update password'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    is_dev = os.environ.get('FLASK_ENV') == 'development' or '--dev' in os.sys.argv
    
    print("\n" + "="*60)
    print(" TRAIT Innovation Web Application Server")
    print(f" Local Access:   http://127.0.0.1:{port} (or http://localhost:{port})")
    print("="*60 + "\n")

    if is_dev:
        app.run(host='0.0.0.0', port=port, debug=True)
    else:
        try:
            from waitress import serve
            print(f"Server active with Waitress WSGI on port {port}...")
            serve(app, host='0.0.0.0', port=port)
        except ImportError:
            print(f"Waitress not available, running Flask server on port {port}...")
            app.run(host='0.0.0.0', port=port, debug=False)
