// metodos estáticos não podem acessar o `this`
// por isso, não vamos colocar o util no construtor
const util = Util;

const ID_CONTEUDO = "conteudo";
const ID_BTN_JOGAR = "jogar";
const ID_MENSAGEM = "mensagem";
const CLASSE_INVISIVEL = "invisible";
const ID_CARREGANDO = "carregando";
const ID_CONTADOR = "contador";
const ID_BTN_MOSTAR_TUDO = "mostrarTudo";
const MENSAGENS = {
  sucesso: {
    texto: "Combinação correta",
    classe: "alert-success",
  },
  erro: {
    texto: "Combinação incorreta",
    classe: "alert-danger",
  },
};
class Tela {
  static obterCodigoHtml(item) {
    return `
    <div class="col-md-3">
      <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}','${item.nome}')">
        <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="${item.nome}">
        </div>
        <br />
    </div>
    `;
  }
  static configurarBotaoVerificarSelecao(funcaoOnClick) {
    window.verificarSelecao = funcaoOnClick;
  }
  static alterarConteudoHTML(codigoHtml) {
    const conteudo = document.getElementById(ID_CONTEUDO);
    conteudo.innerHTML = codigoHtml;
  }
  static gerarStringHTMLPelaImagem(itens) {
    // Para cada item da lista, vai executar a função obterCodigoHtml para
    // ao final, vai concatenar tudo em uma única string
    // Muda de Array para String
    return itens.map(Tela.obterCodigoHtml).join("");
  }
  static atualizarImagens(itens) {
    const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens);
    Tela.alterarConteudoHTML(codigoHtml);
  }
  static configurarBotaoJogar(funcaoOnClick) {
    const btnJogar = document.getElementById(ID_BTN_JOGAR);
    btnJogar.onclick = funcaoOnClick;
  }

  static exibirHerois(nomeDoHeroi, img) {
    const elementsHtml = document.getElementsByName(nomeDoHeroi);
    // para cada elemento encontrado na tela, vamo alterar a gerarStringHTMLPelaImagem
    // para a imagem inicial delegate
    // cin  o forEach para cada item dentro dos () setamos o valor
    // de imagem
    elementsHtml.forEach((item) => (item.src = img));
  }
  static async exibirMensagem(sucesso = true) {
    const elemento = document.getElementById(ID_MENSAGEM);
    if (sucesso) {
      elemento.classList.remove(MENSAGENS.erro.classe);
      elemento.classList.add(MENSAGENS.sucesso.classe);
      elemento.innerText = MENSAGENS.sucesso.texto;
    } else {
      elemento.classList.remove(MENSAGENS.sucesso.classe);
      elemento.classList.add(MENSAGENS.erro.classe);
      elemento.innerText = MENSAGENS.erro.texto;
    }

    elemento.classList.remove(CLASSE_INVISIVEL);
    await util.timeout(1000);
    elemento.classList.add(CLASSE_INVISIVEL);
  }

  static exibirCarregando(mostrar = true) {
    const carregando = document.getElementById(ID_CARREGANDO);
    if (mostrar) {
      carregando.classList.remove(CLASSE_INVISIVEL);
      return;
    }
    carregando.classList.add(CLASSE_INVISIVEL);
  }

  static iniciarContador() {
    let contadorAte = 3;
    const elementoContador = document.getElementById(ID_CONTADOR);
    // Vamos substituir o texto começando $$contador segundos
    // onde está o $$contador adicionaremos o valor
    const identificadorNoTexto = "$$contador";
    const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`;
    // vamos criar uma função em linha para atualizar o texto
    // a cada segundo
    const atualizarTexto = () =>
      (elementoContador.innerText = textoPadrao.replace(
        identificadorNoTexto,
        contadorAte--
      ));

    atualizarTexto();
    // a cada segundo, vai chamar a função atualizar texto
    // essa função vai substituir o $$contador pelo `contadorAte` diminuindo o valor
    // retornamos o idDoIntervalor para parar ele mais tarde
    const idDoIntervalo = setInterval(atualizarTexto, 1000);
    return idDoIntervalo;
  }
  static limparContador(idDoIntervalo) {
    clearInterval(idDoIntervalo);
    // deixar sem texto
    document.getElementById(ID_CONTADOR).innerHTML = "";
  }
  static configurarBotaoMostarTudo(funcaoOnClick) {
    const btnMostrarTudo = document.getElementById(ID_BTN_MOSTAR_TUDO);
    btnMostrarTudo.onclick = funcaoOnClick;
  }
}
