from flask_cors import CORS
from flask import Flask, request, jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash
import jwt

import time
import requests
import psycopg2
from flask_session import Session

app = Flask(__name__)
CORS(app)

users = []
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'your_secret_key'
Session(app)

VIRUSTOTAL_API_KEY = "a42ca6b15253d731136c54f82d7af96561afe8b7db524fd59625cd45ea12b8bf"
# Database URI
db_uri = "postgres://rwmnpwhb:WMmdujpFg1OSrCE--s0HK5mji0fk4kea@drona.db.elephantsql.com/rwmnpwhb"

# Connect to the database
conn = psycopg2.connect(db_uri)
# Create a cursor
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
""")
cursor.execute("""
    CREATE TABLE IF NOT EXISTS newsletter_emails (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL
    )
""")
conn.commit()


def get_user_by_email(email):
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    if user:
        user_data = {
            'id': user[0],
            'username': user[1],
            'email': user[2],
            'password': user[3]
        }
        return user_data
    return None


@app.route('/auth/sign-up', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if user already exists
    if get_user_by_email(email):
        return jsonify({'success': False, 'message': 'Email already exists'}), 400

    # Hash password
    hashed_password = generate_password_hash(password, method='sha256')

    # Add user to database
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, hashed_password))
    conn.commit()

    return jsonify({'success': True, 'message': 'User created successfully'}), 201


@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Find user by email
    user = get_user_by_email(email)

    # Check if user exists and password is correct
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

    # Create a session for the user
    session['user_id'] = user['id']

    # Return the user's information
    return jsonify({'success': True, 'user': user}), 200



@app.route('/auth/refresh', methods=['POST'])
def refresh():
    refresh_token = request.json.get('refresh_token')

    # Verify refresh token
    try:
        payload = jwt.decode(refresh_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload['user_id']
    except jwt.exceptions.DecodeError:
        return jsonify({'success': False, 'message': 'Invalid token'}), 401

    # Create new access token
    access_token = create_access_token(user_id)

    return jsonify({'success': True, 'access_token': access_token}), 200


def scan_url(url):
    api_url = "https://www.virustotal.com/vtapi/v2/url/report"
    params = {
        "apikey": VIRUSTOTAL_API_KEY,
        "resource": url
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # Check for any request errors

        result = response.json()
        return result

    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        return None


@app.route('/check-url', methods=['POST'])
def check_url_endpoint():
    data = request.json
    url = data.get('url')

    if not url:
        return jsonify({'success': False, 'message': 'URL not provided'}), 400

    result = scan_url(url)

    if result is None:
        return jsonify({'success': False, 'message': 'An error occurred while checking the URL'}), 500

    # Process the result from VirusTotal API as per your requirements
    # You can extract specific information or perform additional operations

    return jsonify({'success': True, 'result': result}), 200

def search_ip(ip):
    url = f"https://www.virustotal.com/api/v3/ip_addresses/{ip}"
    headers = {
        "x-apikey": VIRUSTOTAL_API_KEY,
        "Accept": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Check for any request errors

        result = response.json()
        return result

    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        return None

@app.route('/check-ip', methods=['POST'])
def check_ip():
    data = request.json
    ip = data.get('ip')

    if not ip:
        return jsonify({'success': False, 'message': 'IP not provided'}), 400

    result = search_ip(ip)

    if result is None:
        return jsonify({'success': False, 'message': 'An error occurred while searching the IP address'}), 500

    return jsonify({'success': True, 'result': result}), 200
@app.route('/verify-email', methods=['POST'])
def verify_email():
    email = request.json.get('email')

    if not email:
        return jsonify({'success': False, 'message': 'Email not provided'}), 400

    url = f"https://open.kickbox.com/v1/disposable/{email}"

    try:
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()
        disposable = data.get('disposable', False)

        return jsonify({'success': True, 'disposable': disposable}), 200

    except requests.exceptions.RequestException as e:
        return jsonify({'success': False, 'message': 'Failed to verify email'}), 500
    
@app.route('/search', methods=['GET'])
def search_word():
    word = request.args.get('word')

    if not word:
        return jsonify({'success': False, 'message': 'Word not provided'}), 400

    try:
        response = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{word}')
        response.raise_for_status()  # Check for any request errors

        result = response.json()
        return jsonify({'success': True, 'result': result}), 200

    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        return jsonify({'success': False, 'message': 'An error occurred while searching for the word'}), 500

@app.route('/geolocation', methods=['POST'])
def geolocation():
    data = request.json
    ip = data.get('ip')

    if not ip:
        return jsonify({'success': False, 'message': 'IP not provided'}), 400

    # Perform the necessary operations to fetch geolocation data from the IP geolocation API
    
    url = f"https://api.ipgeolocation.io/ipgeo?apiKey=5c353a2f329844bbb05618f3228b64ff&ip={ip}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for any request errors

        result = response.json()
        return jsonify({'success': True, 'result': result}), 200

    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        return jsonify({'success': False, 'message': 'An error occurred while fetching the geolocation data'}), 500

@app.route('/random-user', methods=['GET'])
def random_user():
    try:
        response = requests.get('https://randomuser.me/api/')
        response.raise_for_status()  # Check for any request errors

        data = response.json()
        return jsonify({'success': True, 'user': data['results'][0]}), 200

    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        return jsonify({'success': False, 'message': 'An error occurred while fetching random user data.'}), 500
# ...

@app.route('/newsletter/subscribe', methods=['POST'])
def subscribe():
    email = request.json.get('email')

    if not email:
        return jsonify({'success': False, 'message': 'Email not provided'}), 400

    # Add email to the database
    cursor.execute("INSERT INTO newsletter_emails (email) VALUES (%s)", (email,))
    conn.commit()

    return jsonify({'success': True, 'message': 'Email subscribed successfully'}), 201
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)