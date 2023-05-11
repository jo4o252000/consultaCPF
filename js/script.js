async function buscaendereco (cep){
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    try{
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)//uma promessa sempre vai retornar um objeto do tipo response (then = então)
        let consultaCEPConvertida = await consultaCEP.json()
        if(consultaCEPConvertida.erro){
            throw Error ("Cep não existe")
        }
        var cidade = document.getElementById("cidade")
        var logradouro = document.getElementById("endereco")
        var estado = document.getElementById("estado")
        var bairro = document.getElementById("bairro")

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    }catch (erro){
        mensagemErro.innerHTML = `<p> Cep invalido. tente novamente</p>`
        console.log(erro)
    }
}

let cep = document.getElementById("cep")
cep.addEventListener("focusout", () => {
    buscaendereco(cep.value)
})
//focusout serve para quando o usuario clicar fora do elemento(quando clica ele está com foco naquele elemento (focusin), clicando fora o foco sái daquele elemento (focusout))

// .then(resposta => resposta.json())//solucionando a promessa = transformando a promessa em json
// .then(r => {
//     if(r.erro){ //A api retorna erro = true quando o cep tem um formato valido porém não existe(logo precisamos fazer a tratativa do erro póis não vai cair no catch)
//         throw Error("Esse cep não existe!")//criando um erro
//     }else{
//         console.log(r)
//     }
// })
// .catch(erro => console.log(erro))//(catch = pegue)tratando erro de uma promisse
// .finally(mensagem => console.log("Processamento concluido"))//indepente do resultado da entraga da promisse o finally vai ser executado 

