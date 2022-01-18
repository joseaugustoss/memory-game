class JogoDaMemoria {
  // se mandar um obj = { tela: 1, idade: 2, etc: 3 }
  // vai ignorar o resto das propriedades e pegar somente a propriedade tela
  constructor({ tela, util }) {
    this.tela = tela;
    this.util = util;

    this.heroisIniciais = [
      // caminho do arquivo, sempre relativo do
      // ao index.html
      { img: "./files/batman.png", nome: "batman" },
      { img: "./files/goku.png", nome: "goku" },
      { img: "./files/ded.png", nome: "ded" },
      { img: "./files/flash.png", nome: "flash" },
    ];
    this.iconePadrao = "./files/avatar.png";
    this.heroisEscondidos = [];
    this.heroisSelecionados = [];
  }
  // para usar o this, não podemos usar static
  inicializar() {
    // vai pegar todas as funções da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais);
    // força a tela a user o THIS de jogo da memoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this));
    this.tela.configurarBotaoMostarTudo(this.mostrarHeroisEscondidos.bind(this));
  }
  async embaralhar() {
    const copias = this.heroisIniciais
      // duplicar os itens
      .concat(this.heroisIniciais)
      // entrar em cada item do array
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      // ordenar aleatoriamente
      .sort(() => Math.random() - 0.5);

    this.tela.atualizarImagens(copias);
    this.tela.exibirCarregando();
    const idDoIntervalo = this.tela.iniciarContador();
    // vamos esperar 3 segundos para atualizar a tela
    await this.util.timeout(3000);
    this.tela.limparContador(idDoIntervalo);
    this.esconderHerois(copias);
    this.tela.exibirCarregando(false);
  }
  esconderHerois(herois) {
    //vamos trocar a imagem de todos os herois existentes
    // pelo icone padrão
    // como fizemos no construtor, vamos extrair somente o necessário
    //usando a sintaxe ({chave:1}) estamos falando que vamos retornar
    // o que tiver dentro dos parenteses
    //quando não usamos: (exemplo do id), o JS entende que o nome
    // é o mesmo do valor. Ex. id: id, vira id,
    const heroisOcultos = herois.map(({ nome, id }) => ({
      id,
      nome,
      img: this.iconePadrao,
    }));
    // stualizamos a tela com os  herois ocultos
    this.tela.atualizarImagens(heroisOcultos);
    // guardamos os herois para trabalhar com eles depois
    this.heroisEscondidos = heroisOcultos;
  }
  exibirHerois(nomeDoHeroi) {
    // vamos procurar esse heroi pelo nome em nossos heroisIniciais
    // vamos obter somente a imagem dele
    const { img } = this.heroisIniciais.find(
      ({ nome }) => nomeDoHeroi === nome
    );
    // vamos criar a função na tela para exibir somente o heroi heroisSelecionados
    this.tela.exibirHerois(nomeDoHeroi, img);
  }
  verificarSelecao(id, nome) {
    const item = { id, nome };
    // vamos verificar a quantidade de herois selecionados
    // e tomar ação se escolheu certo ou errado
    const heroisSelecionados = this.heroisSelecionados.length;
    switch (heroisSelecionados) {
      case 0:
        // adiciona a escolha na lista
        // clicada
        this.heroisSelecionados.push(item);
        break;
      case 1:
        // se a quantidade de escolhidos for 1, significa
        // que o usuário só pode escolher mais um
        // vamos obter o primeiro item da lista
        const [opcao1] = this.heroisSelecionados;
        // zerar itens para não selecionar mais de 2
        this.heroisSelecionados = [];
        // conferimos se os nomes e ids batem conforme
        // o esperado
        if (
          opcao1.nome === item.nome &&
          // aqui verificamos se não ids diferentes para
          // o usuário não clicar duas vezes no mesmo
          opcao1.id !== item.id
        ) {
          this.exibirHerois(item.nome);
          // alert("Parabéns, você ganhou!");
          // alert("combinação correta " + item.nome);
          // como o padrão e true, não precisa passar se
          this.tela.exibirMensagem();
          // para a execução

          return;
        }
        this.tela.exibirMensagem(false);
        // fim do case
        break;
    }
  }
  mostrarHeroisEscondidos() {
    // vamos pegar todos os herois da tela e colocar seu
    // respectivo valor correto
    const heroisEscondidos = this.heroisEscondidos;
    for (const heroi of heroisEscondidos) {
      const { img } = this.heroisIniciais.find(
        (item) => item.nome == heroi.nome
      );
      heroi.img = img;
    }
    this.tela.atualizarImagens(heroisEscondidos);
  }
  jogar() {
    this.embaralhar();
  }
}
