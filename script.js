const form = document.getElementById("discountForm");
const priceInput = document.getElementById("price");
const percentageInput = document.getElementById("percentage");
const formMessage = document.getElementById("formMessage");

const resultPlaceholder = document.getElementById("resultPlaceholder");
const resultContent = document.getElementById("resultContent");
const finalPrice = document.getElementById("finalPrice");
const saving = document.getElementById("saving");
const discountBar = document.getElementById("discountBar");
const resultNote = document.getElementById("resultNote");

const currency = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Aceita tanto vírgula quanto ponto como separador decimal.
  const price = parseLocalizedNumber(priceInput.value);
  const percentage = parseLocalizedNumber(percentageInput.value);

  if (!Number.isFinite(price) || price <= 0) {
    showError("Digite um preço maior que zero.");
    priceInput.focus();
    return;
  }

  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
    showError("O desconto deve estar entre 0% e 100%.");
    percentageInput.focus();
    return;
  }

  const discount = price * percentage / 100;
  const finalValue = price - discount;

  finalPrice.textContent = currency(finalValue);
  saving.textContent = currency(discount);
  discountBar.style.width = `${percentage}%`;
  resultNote.textContent = `Desconto aplicado: ${percentage.toLocaleString("pt-BR")}% sobre ${currency(price)}.`;

  resultPlaceholder.hidden = true;
  resultContent.hidden = false;
  formMessage.textContent = "Cálculo realizado! Experimente outros valores.";
  formMessage.classList.remove("error");
});

function parseLocalizedNumber(value) {
  const normalized = String(value).trim().replace(/\\s/g, "").replace(",", ".");
  if (normalized === "") return NaN;
  return Number(normalized);
}

function showError(message) {
  formMessage.textContent = message;
  formMessage.classList.add("error");
  resultContent.hidden = true;
  resultPlaceholder.hidden = false;
}

// Explicações dos elementos selecionáveis do código Python.
const explanations = {
  def: {
    title: "Variáveis",
    icon: "x",
    text: "preco, porcentagem, desconto e valor_final são variáveis. Elas funcionam como espaços na memória que guardam valores para serem utilizados durante o programa.",
    example: 'preco = 100.00'
  },
  float: {
    title: "float()",
    icon: "f",
    text: "Converte um valor para número decimal. Isso permite trabalhar com preços que possuem centavos, como 19.90.",
    example: 'preco = float("19.90")'
  },
  input: {
    title: "input()",
    icon: "i",
    text: "Permite que o programa receba uma informação digitada pelo usuário. O conteúdo recebido inicialmente é tratado como texto.",
    example: 'input("Digite o preço: ")'
  },
  string: {
    title: "Texto (string)",
    icon: '" "',
    text: "Tudo o que aparece entre aspas é um texto. No exemplo, as mensagens orientam o usuário sobre o que deve digitar ou mostram o resultado.",
    example: '"Digite o preço: "'
  },
  number: {
    title: "Número",
    icon: "123",
    text: "É um valor numérico utilizado nos cálculos. O número 100 representa a base da porcentagem; o número 2 informa quantas casas decimais serão consideradas no arredondamento.",
    example: 'desconto = preco * porcentagem / 100'
  },
  print: {
    title: "print()",
    icon: "p",
    text: "Mostra uma informação na tela. É utilizada para apresentar ao usuário o valor economizado e o preço final.",
    example: 'print("Preço final:", valor_final)'
  },
  round: {
    title: "round()",
    icon: "≈",
    text: "Arredonda um número. No programa, round(valor, 2) deixa o resultado com duas casas decimais, como normalmente utilizamos nos preços.",
    example: 'round(19.987, 2) → 19.99'
  }
};

const explanationTitle = document.getElementById("explanationTitle");
const explanationText = document.getElementById("explanationText");
const explanationExample = document.getElementById("explanationExample");
const explanationIcon = document.getElementById("explanationIcon");

document.querySelectorAll(".token[data-key]").forEach((token) => {
  token.setAttribute("tabindex", "0");
  token.setAttribute("role", "button");
  token.setAttribute("aria-label", `Explicação de ${token.textContent}`);

  const showExplanation = () => {
    const item = explanations[token.dataset.key];
    if (!item) return;

    explanationTitle.textContent = item.title;
    explanationText.textContent = item.text;
    explanationExample.textContent = item.example;
    explanationIcon.textContent = item.icon;

    document.querySelectorAll(".token.selected").forEach((selected) => {
      selected.classList.remove("selected");
    });
    token.classList.add("selected");
  };

  token.addEventListener("click", showExplanation);
  token.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showExplanation();
    }
  });
});
