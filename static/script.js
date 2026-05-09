document.addEventListener("DOMContentLoaded", () =>{
    carregarPontuacao()
    carregarCalendario()
})

async function carregarPontuacao(){

    const secao = document.getElementById("section-pontuacao")

    secao.innerHTML = "Carregando dados"

    try{
        const response = await fetch("http://127.0.0.1:5000/pontuacao")

        const dados = await response.json()

        let html = `
            <div class="card">
                <h2>Temporada ${dados[0].temporada}</h2>
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

    secao.innerHTML = "Carregando dados"

    try{
        const response = await fetch("http://127.0.0.1:5000/races")
        const dados = await response.json()


        let html = `
            <div class="card">
                <h2>Temporada ${dados[0].temporada}</h2>
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
                <td>${corrida.sprint}</td>
                <td>${corrida.classificacaoSprint}</td>
                <td>${corrida.classificacao}</td>
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