document.addEventListener("DOMContentLoaded", () =>{
    carregarPontuacao()
    carregarCalendario()
    carregarEquipes()
    carregarPilotos()
})

async function carregarPontuacao(){

    const secao = document.getElementById("section-pontuacao")

    secao.innerHTML = "Carregando dados"

    try{
        const response = await fetch("http://127.0.0.1:5000/pontuacao")

        const dados = await response.json()

        let html = `
            <div class="card">
                <h2>Temporada 2026</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Posicão</th>
                            <th>Piloto</th>
                            <th>Pontos</th>
                            <th>Vitória</th>
                        </tr>
                    </thead>
                    <tbody>
        `
         for (const piloto of dados){
            html +=`
            <tr>
                <td>${piloto.posicaoPiloto}</td>
                <td>${piloto.piloto} ${piloto.sobrenomePiloto}</td>
                <td>${piloto.pontuacaoPiloto}</td>
                <td>${piloto.vitorias}</td>
            </tr>    
            `
                          
        }  
        html += `</tbody></table></div>`

        secao.innerHTML = html     
     } catch(erro){
            secao.innerHTML = "<p>Erro ao carregar os dados</p>"
            console.error(erro)
     }      
}
/*CALENDARIO / CORRIDAS*/


async function carregarCalendario(){

    const secao = document.getElementById("section-calendario")

    try{
        const response = await fetch("http://127.0.0.1:5000/races")
        const dados = await response.json()

        let html = `
            <div class="card">
                <h2>Temporada 2026</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Corrida</th>
                            <th>Circuito</th>
                            <th>Local</th>
                            <th>País</th>
                            <th>Data</th>
                            <th>Treino Livre 1</th>
                            <th>Treino Livre 2</th>
                            <th>Treino Livre 3</th>
                            <th>Classificação</th>
                            <th>Classificação Sprint</th>
                            <th>Sprint</th>
                        </tr>
                    </thead>
                    <tbody>
        `
         for (const corrida of dados){
            html +=`
            <tr>
                <td>${corrida.name}</td>
                <td>${corrida.circuito}</td>
                <td>${corrida.local}</td>
                <td>${corrida.pais}</td>
                <td>${corrida.data}</td>
                <td>${corrida.treinolivre1}</td>
                <td>${corrida.treinolivre2}</td>
                <td>${corrida.treinolivre3}</td>
                <td>${corrida.classificacao}</td>
                <td>${corrida.classificacaoSprint}</td>
                <td>${corrida.sprint}</td>                               
            </tr>    
            `
                          
        }  
        html += `</tbody></table></div>`

        secao.innerHTML = html 
    }
    catch(erro){
            secao.innerHTML = "<p>Erro ao carregar os dados</p>"
            console.error(erro)
     } 
}

/*EQUIPES / CONSTRUTORAS*/

async function carregarEquipes(){

    const secao = document.getElementById("section-equipes")

    try{    
        const response = await fetch("http://127.0.0.1:5000/construtores")
        const dados = await response.json()

        let html = `
            <div class="card">
                <h2>Temporada 2026</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Construtora</th>
                            <th>Nacionalidade</th>
                    </thead>
                    <tbody>
        `
         for (const equipe of dados){
            html +=`
            <tr>
                <td>${equipe.name}</td>
                <td>${equipe.nationality}</td>
            </tr>    
            `                          
        }  

        html += `</tbody></table></div>`
        secao.innerHTML = html 

    }catch(erro){
        secao.innerHTML = "<p>Erro ao carregar os dados</p>"
            console.error(erro)
    }
}

/*PILOTOS E NOMES*/

async function carregarPilotos(){
    const secao = document.getElementById("section-pilotos")

    try{
        const response = await fetch("http://127.0.0.1:5000/drivers")
        const dados = await response.json()

        let html = `
            <div class="card">
                <h2>Temporada 2026</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Nacionalidade</th>
                            <th>Nacionalidade</th>
                            <th>Aniversário</th>
                            <th>Número Piloto</th>
                    </thead>
                    <tbody>
        `
         for (const driver of dados){
            html +=`
            <tr>
                <td>${driver.name}</td>
                <td>${driver.nationality}</td>
                <td>${driver.nascimento}</td>
                <td>${driver.numero}</td>
            </tr>    
            `                          
        }  

        html += `</tbody></table></div>`
        secao.innerHTML = html 

    }catch(erro){
          secao.innerHTML = "<p>Erro ao carregar os dados</p>"
            console.error(erro)
    }  
}   
