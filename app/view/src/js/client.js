function myFunction() {
    $(document).ready(function() {
        $.ajax({
            url: 'http://localhost:3241/filmesComMaisAtores',
            dataType: "json",
            cache: false,
            timeout: 5000,
            success: function(result) {
                result.filmes.forEach((filme)=>{
                    chartGraph.data.labels.push(filme);
                })

                result.quantidadeAtores.forEach((quantidade)=>{
                    chartGraph.data.datasets.forEach((dataset) => {
                        dataset.data.push(quantidade);
                    });
                })
            
            
                chartGraph.update();
                // $("#test").append( document.createTextNode( data.filmes ) );
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
                }

        });
    });
}

//todos os filmes
function checkAtributos(){
 
    const attributes = []
    checkItem = document.querySelectorAll('.form-check-input');

    checkItem.forEach((atributo)=>{
        if(atributo.checked){
            attributes.push(atributo.value)
        }
    })

    return attributes
}

function myFunction1() {

    const orderby = document.getElementById('orderBySelect').value;
    console.log(orderby)
    const attributes = checkAtributos()

    $(document).ready(function() {
        $.ajax({
            url: 'http://localhost:3241/buscarTodosOsFilmes',
            type: "GET",
            data: { 
                valor: lolz.value,
                atributo : attributes,
                order: orderby
            },
            dataType: "json",
            cache: false,
            timeout: 5000,
            success: function(result) {
                $('.teste').empty()
                let tabelaHead = Object.keys(result[0])
                
                tabelaHead.forEach((item)=>{
                    $('.tabelaTitulo').append(`
                            <th>${item}</th>
                    `)
                })
                
                //cria as linhas da coluna
                result.forEach((filme)=>{
                
                    var elemento = document.createElement('tr');
                    elemento.classList.add("teste");

                    
                    tabelaHead.forEach((item)=>{
                        var td = document.createElement('td');
                        td.innerHTML = filme[item]
                        elemento.appendChild(td)
                        
                        $('tbody').append(elemento)
                
                    })
                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
                }

        });
    });
}

const labels = [

];
const data = {
    labels: labels,
    datasets: [{
        label: 'quantidade',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],
    }]
};
var ctx = document.getElementsByClassName('line-chart'); // node
console.log(ctx)
var chartGraph = new Chart(ctx ,{
    type: 'bar',
    data
})