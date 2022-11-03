export default class Conta {
    nome;
    cpf;
    celular;
    senha;
    conta;
    saldo;
    constructor(nome, cpf, celular, senha, conta, saldo) {
      this.nome = nome;
      this.cpf = cpf;
      this.celular = celular;
      this.senha = senha;
      this.conta = conta;
      this.saldo = saldo;
    }
  
    static criarNovaConta(name, cpf, celular, senha) {
      const conta = Math.floor(1000 + Math.random() * 90000);
      return new Conta(name, cpf, celular, senha, conta, 0);
    }
  }