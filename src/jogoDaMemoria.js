class JogoDaMemoria {
  constructor({ tela }) {
    this.tela = tela;

    this.heroisIniciais = [
      { img: "./files/batman.png", name: "batman" },
      { img: "./files/flash.png", name: "flash" },
      { img: "./files/spiderman.png", name: "spiderman" },
      { img: "./files/boy.png", name: "boy" },
    ];
  }
  inicializar() {
    // vai pegar todas as funções da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais);

    // força a tela a usar o THIS de Jogo da memoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
  }
  embaralhar() {
    const copias = this.heroisIniciais
      // duplicar os itens
      .concat(this.heroisIniciais)

      // entrar em cada  idem e criar um id aleatorio
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      .sort(() => Math.random() - 0.5)

    this.tela.atualizarImagens(copias);
  }
  jogar() {
    this.embaralhar();
  }
}
