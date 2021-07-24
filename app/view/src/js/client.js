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


function checkAtributosAtores(){
    const atributosSelecionados = []
    const checkItem = document.querySelectorAll('.check-ator-atributo');

    checkItem.forEach((atributo)=>{
        if(atributo.checked){
            atributosSelecionados.push(atributo.value)
        }
    })

    return atributosSelecionados
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
    console.log(attributes)
    const orderby = document.getElementById('orderBySelect').value;
    const orderbyAtor = document.getElementById('orderBySelectAtor').value;
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
                dataPesquisa: dataSearch,
                nomeAtor: nomeAtor.value,
                popularidade: popularidadeValor.value,
                orderAtor: orderbyAtor
               
            },
            dataType: "json",
            cache: false,
            timeout: 100000000000,
            beforeSend: function() {
                $('#corpo').hide();
                $('#spinner').show();
                console.log('ANTES DE FAZER CHAMADA')
             },
             complete: function(){
                console.log('FINALIZOU REQUEST')
                setTimeout(() => { 
                    $('#corpo').show();
                    $('#spinner').hide();
                }, 300);
                
             },
            success: function(result) {
                    if(result.length == 0){
                        alert('Nenhum registro foi encontrado. Utilize outros parametros para realizar a busa.');
                        return
                    }
                   
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
                              if(filme[item] != null){
                                filme[item].forEach((i)=>{
                                    td.innerHTML += `${i.nome}, `
                                })
                                
                                td.innerHTML =  td.innerHTML.slice(0, -2) + '.';
                              }

    
                            }else{
                                td.innerHTML = filme[item]
                            }
                          
                            elemento.appendChild(td)
                          
                        })
    
                        $('tbody').append(elemento)
    
                    })
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#corpo').show();
                $('#spinner').hide();
                alert('error ' + textStatus + " " + errorThrown);
             
                }

        });
    });
}

const BASE_URL = 'http://localhost:3242'

function realizarBusca(){
    var attributes = []
    let url = '';

    const checkAtor = document.getElementById('atoresCheck')
    var checkItem = document.querySelectorAll('.check-global-atributos');
    let count = 0

    for (let atributo of checkItem) {
        if(atributo.checked){
            count++
        }
    }

    if(checkAtor.checked && count == 0){
        url = `${BASE_URL}/buscarAtores`
        attributes = checkAtributosAtores()
        buscar(url, attributes)
        return
    }else{
        attributes = checkAtributos()
    }

    if(attributes[1].includes('produtoraNome') && attributes[2].includes('generoNome')){
        url = `${BASE_URL}/buscarFilmesGenerosProdutoras`;
    }else if(attributes[1].includes('produtoraNome')){
        url = `${BASE_URL}/buscarFilmesProdutoras`;
    }else if(attributes[2].includes('generoNome')){
        url = `${BASE_URL}/buscarFilmesGeneros`;
    }else if(attributes[3].includes('atoresNome')){
        url = `${BASE_URL}/buscarFilmesAtores`;
    }else{
        url = `${BASE_URL}/buscarTodosOsFilmes`; 
    }

    if(attributes[0].length === 0 && attributes[1].length === 0&& 
        attributes[2].length === 0 && attributes[3].length > 0 ){
        url = `${BASE_URL}/buscarAtores`
    }
    // const attributes = [filmes, produtoras, generos, atores]
    if(attributes[0].length !== 0 && attributes[1].length === 0 && 
        attributes[2].length !== 0 && attributes[3].length !== 0 ){
        url = `${BASE_URL}/buscarFilmesGenerosAtores`
    } 

    if(attributes[0].length !== 0 && attributes[1].length !== 0 && 
        attributes[2].length === 0 && attributes[3].length !== 0 ){
        url = `${BASE_URL}/buscarFilmesProdutorasAtores`
    } 

    if(attributes[0].length !== 0 && attributes[1].length !== 0 && 
        attributes[2].length !== 0 && attributes[3].length !== 0 ){
        url = `${BASE_URL}/buscarFilmesGenerosProdutorasAtores`
    } 

    console.log(url)
    buscar(url, attributes)
}

// produtoras - não tem necessidade de ter
// generos - não tem necessidade de ter


// filmes atores produtoras
// filmes produtoras generos atores