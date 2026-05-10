import requests
import os
import time 
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder="templates")


url = "https://api.jolpi.ca/ergast/f1"

#ROTA PRINCIPAL
@app.route("/")
def index():
    return render_template("index.html") 

#EQUIPES ATUAIS
@app.route("/construtores", methods =["GET"])
def getConstrutores():
    
    response = requests.get(f"{url}/2026/constructors.json")
    data = response.json()
    constructors = data["MRData"]["ConstructorTable"]["Constructors"]
    

    equipes = []

    for equipe in constructors:
        equipes.append({
            "id": equipe.get("constructorId"),
            "name": equipe.get("name"),
            "nationality":equipe.get("nationality")
        })


    return jsonify(equipes)

#PILOTOS 
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

#CALÉNDARIO CAMPEONATO 2026
@app.route("/races", methods =["GET"])
def getCorridas():
    
    response = requests.get(f"{url}/2026/races.json")
    data = response.json()
    races = data["MRData"]["RaceTable"]["Races"]
    
    corridas = []

    for corrida in races:
        treino1 = corrida.get("FirstPractice") or {}
        treino2 = corrida.get("SecondPractice") or {}
        treino3 = corrida.get("ThirdPractice") or {}
        sprint = corrida.get("Sprint") or {}
        qualySprint = corrida.get("SprintQualifying") or {}
    

        corridas.append({
            "name": corrida.get("raceName", "Inexistente"),
            "circuito":corrida.get("Circuit", "Inexistente").get("circuitName", "Inexistente"),
            "local": corrida.get("Circuit", "Inexistente").get("Location", "Inexistente").get("locality", "Inexistente"),
            "pais": corrida.get("Circuit", "Inexistente").get("Location", "Inexistente").get("country", "Inexistente"),
            "data":corrida.get("date"),
            "treinolivre1":treino1.get("date", "Inexistente"),
            "treinolivre2":treino2.get("date", "Corrida com Sprint, sem treino livre 2"),
            "treinolivre3":treino3.get("date", "Corrida com Sprint, sem treino livre "),
            "sprint":sprint.get("date", "Corrida sem Sprint",),
            "classificacaoSprint":qualySprint.get("date", "Corrida sem Sprint"),
            "classificacao":corrida.get("Qualifying", {}).get("date")
        })

    return jsonify(corridas)
    
#PONTUAÇÃO ATUAL DO CAMPEONATO
@app.route("/pontuacao", methods =["GET"])
def getPontuacao():

    response = requests.get(f"{url}/2026/driverstandings.json")
    data = response.json()
    pontuacao = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
    dadosTemporada = data["MRData"]["StandingsTable"]["StandingsLists"][0]

    classAtual = []

    for classificacao in pontuacao:
        classAtual.append({
            "temporada": dadosTemporada.get("season","#"),
            "rodada": dadosTemporada.get("round", "#"),
            "posicaoPiloto": classificacao.get("position", "#"),
            "pontuacaoPiloto": classificacao.get("points", "#"),
            "vitorias": classificacao.get("wins", "#"),
            "piloto":classificacao.get("Driver", {}).get("givenName","#"),
            "sobrenomePiloto": classificacao.get("Driver", {}).get("familyName", "#"),
            "codigo":classificacao.get("Driver", {}).get("code", "#")
        })

    
    return jsonify(classAtual)



if __name__ == "__main__":
    app.run(debug=True)    