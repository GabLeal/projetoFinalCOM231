function gerar_cor_hexadecimal(){
    return '#' + parseInt((Math.random() * 0xFFFFFF))
      .toString(16)
      .padStart(6, '0');
  }

// criar objeto do grafico
function criarGraficoBarra(context, label, title){
    return new Chart(context ,{
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                label: label,
                backgroundColor: [],
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                },
            ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: title
            }
          }
        },
      })
}

// Cria grafico de barra
function popularGraficoBarra(grafico,rota){
    $(document).ready(function() {
        $.ajax({
            url: `http://localhost:3241${rota}`,
            dataType: "json",
            cache: false,
            timeout: 5000,
            success: function(result) {
              console.log(result)
                result.itens.forEach((item)=>{
                    grafico.data.labels.push(item);
                })

                result.quantidade.forEach((valor)=>{
                    grafico.data.datasets.forEach((dataset) => {
                        dataset.data.push(valor);
                        dataset.backgroundColor.push('#0062FF');
                    })

                  
                    
                })
            
                grafico.update();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
                }

        });
    });
}

// INITIALIZE
const ctx = document.getElementsByClassName('line-chart'); 
const context = document.getElementsByClassName('pie-chart');
const produtorasContext = document.getElementsByClassName('produtoras-chart');
const atuacoesContext = document.getElementsByClassName('atuacoes-chart');


const graficoFilmes = criarGraficoBarra(ctx,'quantidade','Filmes com maior número de participações')
const graficoGeneros = criarGraficoBarra(context,'quantidade','Ranking dos gêneros com mais filmes')
const graficoProdutoras = criarGraficoBarra(produtorasContext,'quantidade','Quantidade de filmes por produtora')
const graficoAtuacoes = criarGraficoBarra(atuacoesContext,'quantidade','Atores que mais tiveram atuações')

popularGraficoBarra(graficoGeneros,'/QuantidadeDeFilmesPorGenero')
popularGraficoBarra(graficoFilmes,'/filmesComMaisAtores')
popularGraficoBarra(graficoProdutoras,'/produtorasComMaisFilmes')
popularGraficoBarra(graficoAtuacoes,'/atoresComMaisAtuacoes')



