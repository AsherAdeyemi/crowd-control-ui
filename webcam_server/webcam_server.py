import sys
print("Starting Flask...", file=sys.stderr)

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Flask server is working!"

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5050)

