class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados () {
        for(let i in this) {
            if (this[i] == undefined || this[i] =='' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {  // ATRIBUINDO UM VALOR INICIAL DE ID
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros() {
        console.log('Chegando')

        let despesas = Array()

        let id = localStorage.getItem('id')

        // Recuperar todas as despesas
        for ( let i = 1; i <= id; i++ ) {
            // Resuperar despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // verificar se indice foi removido e pular
            if ( despesa === null) {
                continue
            }

            despesas.push(despesa)

            //console.log(despesas)
        }

        return despesas
    }

    pesquisar(despesa) {
        console.log(despesa)
    }

}

let bd = new Bd()


function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if ( despesa.validarDados() ) {
        bd.gravar(despesa)  // sucesso
        document.getElementById('modal_titulo').innerHTML = 'Registro Inserido com Sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa Cadastrada com Sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        document.getElementById('modal_titulo').innerHTML = 'ERRO ao Inserir o Registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Verifique os Campos Preenchidos'
        document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        $('#modalRegistraDespesa').modal('show')
    }
    
}

function carregaListaDespesas() {
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    let listaDespesas = document.getElementById('listaDespesas')

    /*
    <tr>
                <td>15/03/2018</td>
                <td>Alimentação</td>
                <td>Compras</td>
                <td>444,75</td>
              </tr>
    */
   // percorrer array despesas, listando cada uma de forma dinamica
   despesas.forEach(function (d) {
        // criando a linha
        let linha = listaDespesas.insertRow()

        //criar colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        //ajustar o tipo
        
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
            break;
            case '2': d.tipo = 'Educação'
            break;
            case '3': d.tipo = 'Lazer'
            break;
            case '4': d.tipo = 'Saúde'
            break;
            case '5': d.tipo = 'Transporte'
            break;
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
   })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)
}