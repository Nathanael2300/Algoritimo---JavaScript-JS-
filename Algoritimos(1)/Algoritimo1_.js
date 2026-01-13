class ContaBancaria {
  constructor(saldo = 0, ativa = true) {
    (this.saldo = saldo), (this.ativa = ativa);
  }

  depositar(valor) {
    if (this.ativa == true && valor > 0) {
      this.saldo += valor;
    }
    return `Voce depositou:${this.saldo}`;
  }

  sacar(valor) {
    if (this.ativa == true && valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
    }
    return `Voçê Sacou: ${valor}`;
  }

  saldoAtual() {
    return `Seu saldo atual é: ${this.saldo}`;
  }

  encerrar() {
    if (this.ativa == true && this.saldo == 0) {
      this.ativa = false;
      return "Conta encerrada";
    } else {
      return "Conta Ativa";
    }
  }
}

const depositar = new ContaBancaria();
console.log(depositar.depositar(10000));
console.log(depositar.sacar(3000));
console.log(depositar.saldoAtual());
console.log(depositar.encerrar());
