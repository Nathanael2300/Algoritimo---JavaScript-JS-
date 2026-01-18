class ErrorMonitor {
  constructor(erros = []) {
    this.erros = erros;
  }

  registrarErro(id, tipo, mensagem) {
    const erroEncontrado = this.erros.some((err) => err.id === id);
    if (erroEncontrado) {
      return {
        error: new Error(`o id: ${id} ja existe`),
      };
    }
    if (!tipo == "frontend" || !tipo == "backend" || !tipo == "infra") {
      return {
        error: new Error(`O tipo ${tipo} não é valido`),
      };
    }

    const erro = {
      id,
      tipo,
      mensagem,
      resolvido: false,
    };
    this.erros.push(erro);
    return { suceso: true, erro };
  }

  resolverErro(id) {
    const erroEncontrado = this.erros.find((err) => err.id === id);
    if (!erroEncontrado) {
      return {
        error: new Error(`O id:${id} não foi encontrado`),
      };
    }
    if (erroEncontrado.resolvido === true) {
      return {
        error: new Error(`O id: ${id} ja foi resolvido`),
      };
    }
    erroEncontrado.resolvido = true;
    return { sucesso: true, id };
  }

  listarPorTipo(tipo) {
    return this.erros.filter((err) => err.tipo == tipo);
  }

  listarPendentes() {
    return this.erros.filter((err) => err.resolvido === false);
  }
  relatorio() {
    const errosResolvidos = this.erros.filter((err) => err.resolvido === true);
    const errosPendentes = this.erros.filter((err) => err.resolvido === false);
    const frontEndTipo = this.erros.filter((err) => err.tipo === "frontend");
    const backEndTipo = this.erros.filter((err) => err.tipo === "backend");
    const infraTipo = this.erros.filter((err) => err.tipo === "infra");

    return {
      total: this.erros.length,
      resolvidos: errosResolvidos.length,
      pendentes: errosPendentes.length,
      frontend: frontEndTipo.length,
      backend: backEndTipo.length,
      infra: infraTipo.length,
    };
  }
}

const newErro = new ErrorMonitor();

console.log(
  newErro.registrarErro(1, "frontend", "botão de login não funciona")
);
console.log(
  newErro.registrarErro(
    2,
    "backend",
    "api não retorna os dados do bando de dados"
  )
);
console.log(
  newErro.registrarErro(
    3,
    "infra",
    "não esta registrando usuario no banco de dados"
  )
);

console.log(newErro.resolverErro(1));
console.log(newErro.resolverErro(2));
console.log(newErro.resolverErro(3));
console.log(newErro.listarPorTipo("backend"));
console.log(newErro.listarPendentes());
console.log(newErro.relatorio());
