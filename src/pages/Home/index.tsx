import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { ListFormat } from 'typescript';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);

  const { addProduct, cart } = useCart();

  
  
  //Primeiro valor do reduce é o acumulador, 2. Valor Atual, 3.index, 4. array original
  console.log(cart)
  const cartItemsAmount = cart.reduce((sumAmount, product) => {

   switch(product.id){
      case 1:
        product.amount = 3
        break
        case 2:
        product.amount = 5
        break
      case 3:
        product.amount = 2 
        break
      case 4: 
        product.amount = 1
      break 
      case 5:
        product.amount = 5 
        break 
      case 6:
        product.amount = 10 
        break  
      }
      cart.filter(el => {
        
        console.log(el)
      })
      return {...sumAmount, [product.id]:1}
  

  }, {

  } as CartItemsAmount)

  console.log(cartItemsAmount)

  function handleAddProduct(id: number) {
    addProduct(id)
  }



  //Carrega os dado da api, Não mecha nisso.
  useEffect(()=> {
    async function loadProduct(){
      const { data } = await api.get("/products")
      setProducts(data)
    }
    loadProduct()
  }, [])

  return (
    <ProductList>
      {products.map((product,index) => (
        <li key={index}>
          <img src={product.image} alt="Tênis de Caminhada Leve Confortável" />
          <strong>{product.title}</strong>
          <span>R$ {product.price}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#b8b8b8" />
              {cartItemsAmount[product.id] || 0 }

            </div>
  
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
