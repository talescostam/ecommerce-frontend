import React, { useEffect, useState } from "react";
import RegisterProduct from "./RegisterProduct";
import ShoppingCart from "./ShoppingCart";

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [displayRegister, setDisplayRegister] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);

    const getProducts = () => {
        setLoading(true)

        fetch('http://localhost:8080/products/listAllProducts')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(error => console.error("Erro ao obter a lista de produtos:", error));
    }

    const showForm = () => {
        setDisplayRegister(!displayRegister)
    }

    const deletarProduto = (product) => {
        const requestOptions = {
            method:'DELETE'
        }
        fetch(`http://localhost:8080/products/remove/${product.id}`, requestOptions)
            .then(response => getProducts())
            .catch(error => console.error("Erro ao deletar produto:", error));
    }

    const editarProduto = (product) => {
        console.log(product)
        setSelectedProduct(product)
        showForm()
    }

    const createShoppingCart = () => {
        const requestOptions = {
            method:'POST'
        }

        fetch('http://localhost:8080/shoppingCart/create', requestOptions)
            .then(response => response.json())
            .then(data => setCart(data))
    }

    const adicionarProdutoAoCarrinho = (product) => {
        const payload = {
            "produtoId": product.id,
            "carrinhoId": cart.id
        }

        const requestOptions = {
            method:'POST',
            body:JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`http://localhost:8080/shoppingCart/addToCart`, requestOptions)
            .then(response => getProducts())
            .catch(error => console.error("Erro ao adicionar produto ao carrinho:", error))
    
    } 

    useEffect(() => {
        getProducts()
        createShoppingCart()
    }, [displayRegister])

    return (
        <div>
            <h1>Catálogo de produtos</h1>
            <button onClick={showForm}>Cadastrar produto</button>
            {
                displayRegister ? (<RegisterProduct selectedProduct={selectedProduct} showForm={showForm}/>) : (
                <ul>
                    {products.map((product, index) => (
                        <li key={index}>
                            
                            <img src={product.foto} height="200"></img>
                            <br/>
                            &nbsp;
                            <b>{product.nome}</b>
                            &nbsp;
                            <br/>
                            <button onClick={ () => editarProduto(product) }>Editar</button>
                            &nbsp;
                            <button onClick={ () => deletarProduto(product) }>Deletar</button>
                            &nbsp;
                            <button onClick={ () => adicionarProdutoAoCarrinho(product) }>Adicionar ao carrinho</button>
                            <br/>
                            <br/>
                        </li>
                    ))}
                </ul>)
            }
            {cart.id && !loading ? <ShoppingCart cart={cart}/> : ''} 
        </div>
    );
}