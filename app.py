import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    """Render main landing page."""
    return render_template('index.html')

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
    app.run(host='0.0.0.0', port=port, debug=True)
