import React, { useEffect, useState } from "react";

function ShoppingCart(params) {
  const [cartItems, setCartItems] = useState([]);

  const {cart} = params

  const [showSuccess, setShowSuccess] = useState(false);

  const getCartItens = () => {
    fetch(`http://localhost:8080/shoppingCart/listProducts/${cart.id}`)
        .then(response => response.json())
        .then(data => setCartItems(data))
        .catch(error => console.error("Erro ao obter a lista de produtos:", error));
}  

  const removeFromCart = (product) => {
    const requestOptions = {
        method:'DELETE'
    }
    fetch(`http://localhost:8080/shoppingCart/${cart.id}/removeProduct/${product.id}`, requestOptions)
        .then(response => getCartItens())
        .catch(error => console.error("Erro ao deletar produto:", error));
  };

  const finishCart = (cart) => {
    const carrinhoId = cart.id;
  
    fetch(`http://localhost:8080/shoppingCart/${carrinhoId}/updateStatus`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Compra finalizada com sucesso');
          setShowSuccess(true);
        } else {
          console.error('Falha ao finalizar a compra');
        }
      })
      .catch((error) => {
        console.error('Erro ao finalizar a compra:', error);
      });     
  };


  useEffect(() => {
    getCartItens()
}, [])
console.log(cart)
  return (
    <div className="shopping-cart">
      <h2>Carrinho de Compras</h2>
      <ul>
        {cartItems.length > 0 ? cartItems.map((product) => (
          <li key={product.id}>
            {product.produto.nome} - ${product.produto.preco} - Qtde: {product.quantidade_produto_adicionada}&nbsp;
            <button onClick={() => removeFromCart(product)}>Remover</button>
          </li>
        )): ''}
      </ul>
      <p>Total: ${cartItems.length > 0 ? cartItems.reduce((accumulator, item) => accumulator + (item.produto.preco * item.quantidade_produto_adicionada), 0) : ''}</p>
      <button onClick={() => finishCart(cart)}>Finalizar Compra</button>
      {showSuccess && (
        <div id="success-message" className="success-message">
            Compra finalizada com sucesso!
        </div>
        )}
    </div>
  );
}

export default ShoppingCart;
