from flask import Flask, jsonify
from scripts.options_scraper import options_data

app = Flask(__name__)


@app.route('/')
def hello_world():
  return 'Hello World!'


@app.route('/options')
def get_options_data():
  # Calls a script to generate data
  data = options_data()
  # Sends data back
  return jsonify(data)


if __name__ == '__main__':
  app.run(port=4000, debug=True)
