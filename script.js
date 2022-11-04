import Conta from "./Conta.js";
try {
  let form = document.getElementById("formulario");
  form.addEventListener("submit", submit);
} catch (error) {}

try {
  let formOperacoes = document.getElementById("formularioOperacoes");
  formOperacoes.addEventListener("submit", submitOperacoes);
} catch (error) {}

function submit(event) {
  const contas = getContas();
  event.preventDefault();
  if (event.target.senha.value != event.target.senhaVerificacao.value) {
    alert("as senhas nao conferem.");
    event.target.senha.value = "";
    event.target.senhaVerificacao.value = "";
    return;
  }
  contas.push(
    Conta.criarNovaConta(
      event.target.name.value,
      event.target.cpf.value,
      event.target.celular.value,
      event.target.senha.value
    )
  );

  setContas(contas);

  alert("Conta criada com sucesso.");

  event.target.reset();
}

function submitOperacoes(event) {
  event.preventDefault();
  const contas = getContas();
  const contaNumero = event.target.conta.value;
  const senha = event.target.senha.value;

  if (isNotUsuarioValido(contas, contaNumero, senha)) return;

  switch (event.target.operacoes.value) {
    case "saque":
      saque();
      break;

    case "deposito":
      deposito();
      break;

    case "saldo":
      saldo(contas, contaNumero);
      break;
  }

  setContas(contas);
}

const isNotUsuarioValido = (arrayContas, contaNumero, senha) => {
  let x = arrayContas.findIndex(obj => {
    if (obj.conta == contaNumero && obj.senha == senha) {
      return true;
    }
  });
  if (x < 0) return true;
  return false;
};

const setContas = (array) => {
  localStorage.setItem("contas", JSON.stringify(array));
};

const getContas = () => {
  try {
    return JSON.parse(localStorage.getItem("contas"));
  } catch (error) {
    return [];
  }
};

const saque = (arrayContas, contaNumero) => {};

const deposito = () => {};

const saldo = (arrayContas, contaNumero) => {
  arrayContas.forEach((obj) => {
    if (obj.conta == contaNumero) alert("Seu saldo é " + obj.saldo);
  });
};

const selecionaOperacao = () => {
  const selectedValue = document.getElementById("operacoes").value;
  const valorElement = document.getElementById("valor");
  if (selectedValue == "saldo") {
    valorElement.disabled = true;
  } else {
    valorElement.disabled = false;
  }
};

document.selecionaOperacao = selecionaOperacao;
