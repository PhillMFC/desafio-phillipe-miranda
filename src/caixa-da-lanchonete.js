import { menuTable } from "./caixa-da-lanchonete-db";

class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        if(!itens[0]){
            return "Não há itens no carrinho de compra!";
        } else {
            let valorTotal = 0;
            let quantity = [];

            let cartList = itens.map(item => {
                item = item.split(',');
                quantity.push(item[1]);
                return item[0];
            });
            

            if(!menuTable.payment[metodoDePagamento]){
                return "Forma de pagamento inválida!";
            }

            if(cartList.includes('queijo') && !cartList.includes('sanduiche')){
                return "Item extra não pode ser pedido sem o principal";
            }

            if(cartList.includes('chantily') && !cartList.includes('cafe')){
                return "Item extra não pode ser pedido sem o principal";
            }

            if(quantity.includes('0')){
                return "Quantidade inválida!";
            }

            for(let i = 0; i<cartList.length; i++){
                if(!menuTable.items[cartList[i]]){
                    return "Item inválido!";
                } else {
                    valorTotal += menuTable.items[cartList[i]].valor * quantity[i];
                }
            }
              
            
            return 'R$ ' + ((valorTotal * menuTable.payment[metodoDePagamento]).toFixed(2)).replace('.',',');
        }
    }
}

export { CaixaDaLanchonete };