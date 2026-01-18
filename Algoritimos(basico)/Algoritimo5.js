class FilaAtendimento {
  constructor(fila = []) {
    this.fila = fila;
  }

  adicionarCliente(id, nome) {
    const addClient = this.fila.some((client) => client.id === id);
    if (addClient) {
      return {
        error: new Error(`o id:${id} ja existe `),
      };
    }
    const cliente = {
      id,
      nome,
      status: "aguardando",
    };

    this.fila.push(cliente);
    return {
      sucesso: true,
      cliente,
    };
  }
  chamarProximo() {
    let clienteEncontrado = this.fila.find(
      (stats) => stats.status == "aguardando"
    );
    if (!clienteEncontrado) {
      return {
        error: new Error("Cliente não encontrado!"),
      };
    }
    clienteEncontrado.status = "em_atendimento";
    return {
      sucesso: true,
      status: clienteEncontrado.status,
    };
  }
  finalizarAtendimento(id) {
    let clienteEncontrado = this.fila.find((client) => client.id === id);
    if (!clienteEncontrado) {
      return {
        error: new Error(`O id:${id} não foi encontrado`),
      };
    }

    if (clienteEncontrado.status !== "em_atendimento") {
      return {
        error: new Error(`O id:${id} não esta sendo atentido`),
      };
    }
    clienteEncontrado.status = "finalizado";
    return {
      sucesso: true,
      status: clienteEncontrado.status,
    };
  }
  listarPorStatus(stats) {
    if (this.fila) {
      return this.fila.filter((client) => client.status == stats);
    }
    return [];
  }
  relatorio() {
    const clienteAguardando = this.fila.filter(
      (client) => client.status == "aguardando"
    );
    const clientEmAtendimento = this.fila.filter(
      (client) => client.status == "em_atendimento"
    );
    const clientFinalizado = this.fila.filter(
      (client) => client.status == "finalizado"
    );
    return {
      total: this.fila.length,
      aguardando: clienteAguardando.length,
      em_atendimento: clientEmAtendimento.length,
      finalizado: clientFinalizado.length,
    };
  }
}

const cliente = new FilaAtendimento();

console.log(cliente.adicionarCliente(1, "nathan"));
console.log(cliente.chamarProximo());
console.log(cliente.finalizarAtendimento(1));
console.log(cliente.listarPorStatus("finalizado"));
console.log(cliente.relatorio());
