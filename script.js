const produtos = [
    { id: 1, nome: "Delícia de Chocolate Belga", descricao: "Cupcake de chocolate escuro intenso com trufa e granulados.", preco: 8.50 },
    { id: 2, nome: "Expresso Perfeito", descricao: "Café expresso autêntico e encorpado com aroma envolvente.", preco: 4.00 }
];

let carrinho = [];

function renderizarProdutos() {
    const grid = document.getElementById("grid-produtos");
    if (!grid) return;
    
    grid.innerHTML = "";
    produtos.forEach(p => {
        const card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <p><strong>R$ ${p.preco.toFixed(2).replace('.', ',')}</strong></p>
            <button onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
        `;
        grid.appendChild(card);
    });
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(item => item.id === id);
    if (produto) {
        carrinho.push(produto);
        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    const itensContainer = document.getElementById("drawer-items");
    if (!itensContainer) return;

    itensContainer.innerHTML = "";
    let subtotal = 0;

    carrinho.forEach(item => {
        subtotal += item.preco;
        const div = document.createElement("div");
        div.style.cssText = "display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; border-bottom: 1px solid #333; padding-bottom: 5px;";
        div.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
        `;
        itensContainer.appendChild(div);
    });

    const frete = 3.50;
    const total = subtotal > 0 ? subtotal + frete : 0;

    const valTotalEl = document.getElementById("val-total");
    if (valTotalEl) {
        valTotalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function finalizarCheckout() {
    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio!");
        return;
    }
    alert("Pedido gerado com sucesso! Redirecionando para o pagamento via PIX...");
    carrinho = [];
    atualizarCarrinho();
}

window.onload = renderizarProdutos;
