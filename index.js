function onLoad() {
  const dependencias = {
    tela: Tela, // a classe Tela é global.
    util: Util,
  };
  //inicializar o jogo da memoria
  const jogoDaMemoria = new JogoDaMemoria(dependencias);
  jogoDaMemoria.inicializar();
}

window.onload = onLoad;
