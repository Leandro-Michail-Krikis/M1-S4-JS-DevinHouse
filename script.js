import Conta from "./Conta.js";
try {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", submit);
} catch (error) {}

try {
  const formOperacoes = document.getElementById("formularioOperacoes");
  formOperacoes.addEventListener("submit", submitOperacoes);
} catch (error) {}
const contas = [];

function submitOperacoes(event) {
  event.preventDefault();
}

function submit(event) {
  event.preventDefault();
  if (event.target.senha.value != event.target.senhaVerificacao.value) {
    alert("as senhas nao conferem.");
  }
  contas.push(
    Conta.criarNovaConta(
      event.target.name.value,
      event.target.cpf.value,
      event.target.celular.value,
      event.target.senha.value
    )
  );

  salvaArray("contas", contas);

  alert("Conta criada com sucesso.");

  event.target.reset();
}

const salvaArray = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};
