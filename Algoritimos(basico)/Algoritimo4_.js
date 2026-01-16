class TestRunner {
  constructor(tests = []) {
    this.tests = tests;
  }

  adicionarTeste(id, nome) {
    const idFixed = this.tests.some((test) => test.id === id);
    if (idFixed) {
      return {
        error: new Error("ID ja existente"),
      };
    }
    const test = {
      id,
      nome,
      status: "pendente",
    };

    this.tests.push(test);

    return {
      sucesso: true,
      test,
    };
  }

  executarTeste(id, resultado) {
    const findId = this.tests.find((test) => test.id === id);

    if (!findId) {
      return {
        error: new Error(`O ID:${id} não foi encontrado!`),
      };
    }

    findId.status = resultado;

    return {
      id: id,
      sucesso: true,
      status: resultado,
    };
  }

  listarPorStatus(status) {
    if (this.tests) {
      return this.tests.filter((test) => test.status === status);
    }
    return [];
  }

  relatorio() {
    const testsTrue = this.tests.filter((test) => test.status == "passou");
    const testsFalse = this.tests.filter((test) => test.status == "falhou");
    const testsPending = this.tests.filter((test) => test.status == "pendente");
    return {
      total: this.tests.length,
      passou: testsTrue.length,
      falhou: testsFalse.length,
      pendente: testsPending.length,
    };
  }
}

const runnerTest = new TestRunner();

console.log(runnerTest.adicionarTeste(1, "E2E"));
console.log(runnerTest.adicionarTeste(2, "login"));
console.log(runnerTest.adicionarTeste(3, "API"));
console.log(runnerTest.executarTeste(1, "passou"));
console.log(runnerTest.executarTeste(2, "passou"));
console.log(runnerTest.executarTeste(4, "passou"));
console.log(runnerTest.listarPorStatus("passou"));
console.log(runnerTest.relatorio());
