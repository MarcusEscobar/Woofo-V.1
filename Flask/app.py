from flask import Flask, render_template, send_file

app = Flask(__name__,template_folder='templates')

@app.route("/")
def home():
    return render_template('home.html')

@app.route('/imagem')
def imagem():
    return send_file('static/woof.jpg', mimetype='image/jpeg')
@app.route('/imagempng')
def imagempng():
    return send_file('static/1.png', mimetype='image/png')

@app.route('/pagina')
def pagina():
    return render_template('imagem.html')

@app.route('/index')
def index():
    context={'mensagem':'Mensagem top'}
    return render_template('index.html', **context)



if __name__ == '__main__':
    app.run(debug=True)