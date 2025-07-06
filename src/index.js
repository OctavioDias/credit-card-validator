const ASSET_BASE_PATH = '../assets/';

function identificarBandeira(numero) {
  const n = numero.replace(/\D/g, '');

  const regras = [
    { nome: 'Visa', regex: /^4/, img: `${ASSET_BASE_PATH}visa.png` },
    { nome: 'MasterCard', regex: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/, img: `${ASSET_BASE_PATH}mastercard.png` },
    { nome: 'Elo', regex: /^(4011|4312|4389|4576|5041|5066|5090|6277|6362|6504|6505|6509|6516|6550)/, img: `${ASSET_BASE_PATH}elo.png` },
    { nome: 'American Express', regex: /^3[47]/, img: `${ASSET_BASE_PATH}amex.png` },
    { nome: 'Discover', regex: /^(6011|65|64[4-9])/, img: `${ASSET_BASE_PATH}discover.png` },
    { nome: 'Hipercard', regex: /^6062/, img: `${ASSET_BASE_PATH}hipercard.png` },
    { nome: 'Aura', regex: /^(5047|5233|1634|4063|5084|9231|0986|4182|5032|5394|5752|0888|5074|4210|5770|8479)/, img: `${ASSET_BASE_PATH}aura.png` },
    { nome: 'JCB', regex: /^35/, img: `${ASSET_BASE_PATH}jcb.png` },
    { nome: 'Diners Club', regex: /^(36|38|3055|3654|588872)/, img: `${ASSET_BASE_PATH}diners.png` },
    { nome: 'enRoute', regex: /^(2014|2149)/, img: `${ASSET_BASE_PATH}enroute.png` },
    { nome: 'Voyager', regex: /^(86993|86996|86999|5455|71037|1494|40876)/, img: `${ASSET_BASE_PATH}voyager.png` }
  ];

  for (const regra of regras) {
    if (regra.regex.test(n)) {
      return { nome: regra.nome, img: regra.img };
    }
  }

  return { nome: 'Bandeira desconhecida', img: `${ASSET_BASE_PATH}desconhecida.png` };
}

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('cartao');
  const img = document.getElementById('bandeira-img');
  const nome = document.getElementById('bandeira-nome');

  function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function handleInput() {
    const resultado = identificarBandeira(this.value);
    img.onerror = function () {
      img.src = `${ASSET_BASE_PATH}desconhecida.png`;
      img.alt = 'Imagem não encontrada';
      img.title = 'Imagem não encontrada';
    };
    img.src = resultado.img;
    img.alt = resultado.nome;
    img.title = resultado.nome;
    nome.textContent = resultado.nome;
  }

  input.addEventListener('input', debounce(handleInput, 300));
});