function onLoad() {
  const depencencias  = {
    tela: Tela // vindo de um contexto global
  }
  const jogoDaMemoria = new JogoDaMemoria(depencencias)
  jogoDaMemoria.inicializar();
}

window.onload = onLoad;
