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
  debugger;
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
  const valor = event.target.valor.value;
  console.log(valor);

  if (valor == "" || valor <= 0) {
    alert("Valor invalido.");
    return;
  }

  // if (isNotUsuarioValido(contas, contaNumero, senha)) {
  //   alert("Usuario nao existe.");
  //   return;
  // }
  const indexUsuario = retornaIndexUsuario(contas, contaNumero, senha);
  if (indexUsuario < 0) {
    alert("Usuario inexistente.");
    return;
  }
  let contaUsuario = contas[indexUsuario];

  switch (event.target.operacoes.value) {
    case "saque":
      contas[indexUsuario] = saque(contaUsuario, valor);
      break;

    case "deposito":
      contas[indexUsuario] = deposito(contaUsuario, valor);
      break;

    case "saldo":
      saldo(contaUsuario);
      break;
  }

  setContas(contas);
}

const retornaIndexUsuario = (arrayContas, contaNumero, senha) => {
  return arrayContas.findIndex((obj) => {
    if (obj.conta == contaNumero && obj.senha == senha) {
      return true;
    }
  });
};

const setContas = (array) => {
  localStorage.setItem("contas", JSON.stringify(array));
};

const getContas = () => {
  try {
    let retorno = JSON.parse(localStorage.getItem("contas"));
    if (retorno == null) return [];
    return retorno;
  } catch (error) {
    return [];
  }
};

const saque = () => {};

const deposito = (contaUsuario, valor) => {
  contaUsuario.saldo += parseInt(valor)
  alert("Seu novo saldo e:" + contaUsuario.saldo)
  return contaUsuario
};

const saldo = (contaUsuario) => {
  alert("Seu saldo é: " + contaUsuario.saldo)
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
