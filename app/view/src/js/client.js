function checkAtributos(){
 
    const filmes = []
    const produtoras = []
    const generos = []
    const atores = []
    const attributes = [filmes, produtoras, generos, atores]


    checkItem = document.querySelectorAll('.form-check-input');

    checkItem.forEach((atributo)=>{
        if(atributo.checked){
            if(atributo.value === 'produtoraNome'){
                produtoras.push(atributo.value)
            }else if(atributo.value === 'generoNome'){
                generos.push(atributo.value)
            }else if(atributo.value === 'atoresNome'){
                atores.push(atributo.value)
            }else{
                filmes.push(atributo.value)
                
            }
            
        }
    })

    return attributes
}


function getDataAtual(){
    var dataAual = new Date();
    const dataAualFormatada = $.datepicker.formatDate('yy-mm-dd', dataAual);

    return dataAualFormatada;
}

function getInputDateBetween(){
    var dataInicial = $("#dataInicial").datepicker("getDate");
    var dataFinal = $("#dataFinal").datepicker("getDate");

    const dataInicialFormatada = $.datepicker.formatDate('yy-mm-dd', dataInicial);
    const dataFinalFormatada = $.datepicker.formatDate('yy-mm-dd', dataFinal);

    const data = {
        dataInicial: dataInicialFormatada ? dataInicialFormatada : '1990-01-01',
        dataFinal: dataFinalFormatada ? dataFinalFormatada : getDataAtual()
    }

   return data
}

function buscar(url, attributes) {

    const orderby = document.getElementById('orderBySelect').value;
    const generoFilme = document.getElementById('selectGenero').value;
    const limit = document.getElementById('limit').value;

    const dataSearch = getInputDateBetween()

    console.log(dataSearch)
    
    $(document).ready(function() {
        $.ajax({
            url: url,
            type: "GET",
            data: { 
                valor: lolz.value,
                atributo : attributes,
                order: orderby,
                generoFilme: generoFilme,
                nomeProdutora: nomeProdutora.value,
                limit: limit,
                nota: notaValor.value,
                dataPesquisa: dataSearch
               
            },
            dataType: "json",
            cache: false,
            timeout: 100000000000,
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
                        if(typeof filme[item] === 'object'){
                         
                            filme[item].forEach((i)=>{
                                td.innerHTML += `${i.nome}, `
                            })
                            
                            td.innerHTML =  td.innerHTML.slice(0, -2) + '.';

                        }else{
                            td.innerHTML = filme[item]
                        }
                      
                        elemento.appendChild(td)
                      
                    })

                    $('tbody').append(elemento)

                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
                }

        });
    });
}

function realizarBusca(){

    const attributes = checkAtributos()
    let url = '';
    
    if(attributes[1].includes('produtoraNome') && attributes[2].includes('generoNome')){
        url = 'http://localhost:3242/buscarFilmesGenerosProdutoras';
    }else if(attributes[1].includes('produtoraNome')){
        url = 'http://localhost:3242/buscarFilmesProdutoras';
    } else if(attributes[2].includes('generoNome')){
        url = 'http://localhost:3242/buscarFilmesGeneros';
    }else if(attributes[3].includes('atoresNome')){
        url = 'http://localhost:3242/buscarFilmesAtores';
    }else{
        url = 'http://localhost:3242/buscarTodosOsFilmes'; 
    }

    buscar(url, attributes)
}

// produtoras
// generos
// atores


// filmes generos atores
// filmes atores produtoras
// filmes produtoras generos atores