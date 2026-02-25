from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.jinja_options['variable_start_string'] = '<%'
app.jinja_options['variable_end_string'] = '%>'

@app.route("/")
def carte():
    return render_template('carte.html')

@app.route("/earthquakes")
def earthquakes():
    return render_template("earthquakes.html")

@app.route("/ligne_droite")
def ligne_droite():
    return render_template("ligne_droite.html")


@app.route("/restaurant")
def restaurant():
    return render_template("restaurant.html")

@app.route("/restaurant_maplibre")
def restaurant_maplibre():
    return render_template("restaurant_maplibre.html")

@app.route("/hydro")
def hydro():
    return render_template("hydro.html")

@app.route("/relief")
def relief():
    return render_template("relief.html")

@app.route("/sealevel")
def sealevel():
    return render_template("sealevel.html")

@app.route("/accueil")
def accueil():
    return render_template("accueil.html")

if __name__ == '__main__':
    app.run(debug=True)


