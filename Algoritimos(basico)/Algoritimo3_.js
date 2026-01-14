class FeatureFlag {
  constructor(ativa = false) {
    this.ativa = ativa;
  }

  ativar() {
    if (this.ativa) {
      return {
        sucesso: false,
        mensagem: "Feature já ativa",
      };
    }
    this.ativa = true;
    return {
      sucesso: true,
      mensagem: "Feature ativada",
    };
  }

  desativar() {
    if (this.ativa) {
      return {
        sucesso: true,
        mensagem: "Feature já desativada",
      };
    }
    this.ativa = false;
    return {
      sucesso: false,
      mensagem: "Feature desativada",
    };
  }
}

const FeatAtiva = new FeatureFlag(true);
const FeatDesativa = new FeatureFlag(false);
console.log(FeatAtiva.ativar());
console.log(FeatDesativa.desativar());
