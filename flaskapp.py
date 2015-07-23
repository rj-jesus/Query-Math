from flask import Flask, request, flash, url_for, redirect, render_template, abort, send_from_directory
from urllib.parse import urlencode
from urllib.request import urlopen

app = Flask(__name__)

BaseURL = 'http://api.wolframalpha.com/v2/query?'
AppId = 'H2YK4X-8XX7QU8JR7'
PodState = '*Step-by-step solution'


@app.route('/')
def index():
    return serve_static_resource('index.html')


@app.route('/<path:resource>')
def serve_static_resource(resource):
    return send_from_directory('static/', resource)


@app.route('/query', methods=['GET', 'POST'])
def query():
    # Accepting both GET and POST
    query_input = request.values.get('input')
    xml = get(query_input)
    # Might implement the parse on the client side
    html = xml
    return html


def get(text):
    url = BaseURL + urlencode({'input': text, 'appid': AppId, 'podstate': PodState})
    return urlopen(url).read().decode('utf-8')


if __name__ == '__main__':
    app.run()
