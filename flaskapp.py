from urllib.parse import urlencode
from urllib.request import urlopen

from flask import Flask, request, send_from_directory

app = Flask(__name__, static_url_path='')

BaseURL = 'http://api.wolframalpha.com/v2/query?'
AppId = 'H2YK4X-8XX7QU8JR7'
PodState = '*Step-by-step solution'


@app.route('/')
def root():
    return app.send_static_file('index.html')


# @app.route('/')
# @app.route('/static/')
# def index():
#     return send_from_directory('static/', 'index.html')
#
#
# @app.route('/<path:resource>')
# def static_serving(resource):
#     return send_from_directory('static/', resource)


@app.route('/query', methods=['GET', 'POST'])
def query():
    # Accepting both GET and POST
    query_input = request.values.get('input')
    return get(query_input)


def get(text):
    url = BaseURL + urlencode({'input': text, 'appid': AppId, 'podstate': PodState})
    return urlopen(url).read().decode('utf-8')


if __name__ == '__main__':
    app.run()
