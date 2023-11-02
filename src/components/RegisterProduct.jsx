import React, { useEffect, useState } from "react";

export default function RegisterProduct(params) {
    const [data, setData] = useState({});

    const { showForm, selectedProduct } = params
    
    const register = () => {
        const urlPOST = 'http://localhost:8080/products/create'
        const urlPUT = `http://localhost:8080/products/edit/`
        const requestOptions = {
            method: selectedProduct ? 'PUT' : 'POST',
            body:JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        console.log(selectedProduct ? urlPUT + selectedProduct.id : urlPOST)
        fetch(selectedProduct ? urlPUT + selectedProduct.id : urlPOST , requestOptions)
            .then(response => {response.json(); showForm()})
            .catch(error => console.error("Erro ao manipular produto:", error));
    }

    const changeData = (event) => {
        console.log(event.target.value, event.target.name)
        const objeto = {}
        objeto[event.target.name] = event.target.value
        selectedProduct[event.target.name] = event.target.value
        setData({...data, ...objeto})
    }

    useEffect(() => {
        if (selectedProduct) {
            setData(selectedProduct)
        }
    }, []);
    

    return (
        <div>
            <div>
                <label>
                    Nome do produto:&nbsp;
                </label>
                <input value={selectedProduct ? selectedProduct.nome : ''} name='nome' type='text' onChange={changeData}/>
            </div>
            <div>
                <label>
                    Preço:&nbsp;
                </label>
                <input value={selectedProduct ? selectedProduct.preco : ''} name='preco' type='number' onChange={changeData}/>
            </div>
            <div>
                <label>
                    Quantidade:&nbsp;
                </label>
                <input value={selectedProduct ? selectedProduct.quantidade : ''} name='quantidade' type='number' onChange={changeData}/>
            </div>
            <div>
                <label>
                    URL da imagem do produto:&nbsp;
                </label>
                <input value={selectedProduct ? selectedProduct.foto : ''} name='foto' type='text' onChange={changeData}/>
            </div>
            <button onClick={ showForm }>Cancelar</button>
            <button onClick={ register }>Confirmar</button>
        </div>
    );
}