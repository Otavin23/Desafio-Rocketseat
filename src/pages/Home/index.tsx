import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

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

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    console.log(sumAmount)
    console.log(product)
    console.log("Teste")
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const {data} = await api.get('/products') 
      setProducts(data)
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id)
  }
  return (
    <ProductList>
      {products.map((product) => (
        <li>
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
              {/* {cartItemsAmount[product.id] || 0} */} 20
            </div>
  
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
