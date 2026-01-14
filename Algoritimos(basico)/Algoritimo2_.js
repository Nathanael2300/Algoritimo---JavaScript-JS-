class Festa {
  constructor() {
    this.Acesso = "Bloqueado";
    this.Pessoa = "Fora";
  }

  entrar() {
    if (this.Acesso === "Liberado" && this.Pessoa === "Fora") {
      this.Pessoa = "Dentro";
      return { sucesso: true, msg: "Bem-vindo" };
    }

    return { sucesso: false, msg: "Acesso negado" };
  }

  liberarAcesso() {
    if (this.Acesso === "Liberado") {
      return { erro: "Acesso já liberado" };
    }

    this.Acesso = "Liberado";
    return { sucesso: true, msg: "Acesso liberado" };
  }

  sair() {
    if (this.Pessoa === "Fora") {
      return { erro: "Ninguém está dentro" };
    }

    this.Pessoa = "Fora";
    return { sucesso: true, msg: "Até mais" };
  }

  bloquearAcesso() {
    if (this.Pessoa === "Dentro") {
      return { erro: "Pessoa ainda está dentro" };
    }

    this.Acesso = "Bloqueado";
    return { sucesso: true, msg: "Acesso bloqueado" };
  }
}

const a = new Festa();

console.log(a.liberarAcesso());
console.log(a.bloquearAcesso());
console.log(a.entrar());
console.log(a.sair());
