import requests
import os
import time 
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder="templates")


url = "https://api.jolpi.ca/ergast/f1"

@app.route("/")
def index():
    return render_template("index.html") 


@app.route("/construtores", methods =["GET"])
def getConstrutores():
    
    response = requests.get(f"{url}/2026/constructors.json")
    data = response.json()
    constructors = data["MRData"]["ConstructorTable"]["Constructors"]


    equipes = []

    for equipe in constructors:
        equipes.append({
            "id": equipe["constructorId"],
            "name": equipe["name"],
            "nationality":equipe["nationality"]
        })


    return jsonify(equipes)

@app.route("/drivers", methods =["GET"])
def getPilotos():
    
    response = requests.get(f"{url}/2026/drivers.json")
    data = response.json()
    drivers = data["MRData"]["DriverTable"]["Drivers"]


    pilotos = []

    for piloto in drivers:
        pilotos.append({
            "name": piloto.get("givenName", "#"),
            "nationality":piloto.get("nationality", "#"),
            "nascimento": piloto.get("dateOfBirth", "#"),
            "numero": piloto.get("permanentNumber", "#")
        })


    return jsonify(pilotos)

@app.route("/races", methods =["GET"])
def getCorridas():
    
    response = requests.get(f"{url}/2026/races.json")
    data = response.json()
    races = data["MRData"]["RaceTable"]["Races"]


    corridas = []

    for corrida in races:
        corridas.append({
            "name": corrida.get("raceName", "Inexistente"),
            "circuito":corrida.get("Circuit", "Inexistente").get("circuitName", "Inexistente"),
            "local": corrida.get("Circuit", "Inexistente").get("Location", "Inexistente").get("locality", "Inexistente"),
            "pais": corrida.get("Circuit", "Inexistente").get("Location", "Inexistente").get("country", "Inexistente"),
            "data":corrida.get("date"),
            "treinolivre1":corrida.get("FirstPractice", "Sem treino"),
            "treinolivre2":corrida.get("SecondPractice", "Corrida sem treino livre 2, corrida Sprint"),
            "treinolivre3":corrida.get("ThirdPractice", "Corrida sem treino livre 3, corrida Sprint"),
            "sprint":corrida.get("Sprint", "Corrida sem Sprint"),
            "classificacaoSprint":corrida.get("SprintQualifying"),
            "classificacao":corrida.get("Qualifying")
        })

    return jsonify(corridas)
    

@app.route("/pontuacao", methods =["GET"])
def getPontuacao():

    response = requests.get(f"{url}/2026/driverstandings.json")
    data = response.json()
    pontuacao = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]


    classAtual = []

    for classificacao in pontuacao:
        classAtual.append({
            "temporada": classificacao.get("season", "#"),
            "rodada": classificacao.get("round", "#"),
            "posicaoPolito": classificacao.get("position", "#"),
            "pontuacaoPiltos": classificacao.get("points", "#"),
            "vitorias": classificacao.get("wins", "#"),
            "piloto":classificacao.get("Driver", "#").get("givenName","#"),
            "codigo":classificacao.get("code", "#")
        })

    
    return jsonify(classAtual)

if __name__ == "__main__":
    app.run(debug=True)    