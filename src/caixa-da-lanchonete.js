const cardapio = {
  cafe: 3.00,
  chantily: 1.50,
  suco: 6.20,
  sanduiche: 6.50,
  queijo: 2.00,
  salgado: 7.25,
  combo1: 9.50,
  combo2: 7.50
};

const regrasPagamento = {
  dinheiro: {
    desconto: 0.05
  },
  debito: {
    desconto: 0
  },
  credito: {
    acrescimo: 0.03
  }
};

class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    if (!formaDePagamento || !regrasPagamento[formaDePagamento]) {
      return "Forma de pagamento inválida!";
    }

    if (!Array.isArray(itens) || itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;

    for (const itemInfo of itens) {
      const [item, quantidade] = itemInfo.split(',');
      
      if (!cardapio[item] && item !== "combo1" && item !== "combo2") {
        return "Item inválido!";
      }

      if (item !== "combo1" && item !== "combo2") {
        total += cardapio[item] * quantidade;
      }
    }

    for (const itemInfo of itens) {
      const [item, quantidade] = itemInfo.split(',');

      if (cardapio[item] === undefined) {
        return "Item inválido!";
      }

      if (item === "chantily" || item === "queijo") {
        if (!itens.includes(item.replace("extra", ""))) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (total === 0) {
      return "Quantidade inválida!";
    }

    if (regrasPagamento[formaDePagamento].desconto) {
      total -= total * regrasPagamento[formaDePagamento].desconto;
    }
    if (regrasPagamento[formaDePagamento].acrescimo) {
      total += total * regrasPagamento[formaDePagamento].acrescimo;
    }

    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

module.exports = {
  CaixaDaLanchonete
};
