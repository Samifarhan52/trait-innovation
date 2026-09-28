import os
from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__, static_folder='static', template_folder='templates')

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


