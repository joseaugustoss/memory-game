class JogoDaMemoria{
    constructor({tela}) {
        this.tela = tela;

        this.heroisIniciais = [
            {img: './files/batman.png', name: 'batman'},
            {img: './files/flash.png', name: 'flash'},
            {img: './files/spiderman.png', name: 'spiderman'},
            {img: './files/boy.png', name: 'boy'}
        ];
    }
    inicializar(){
        // vai pegar todas as funções da classe tela!
        // coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
    }
}