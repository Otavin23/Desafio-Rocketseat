import React, { useState } from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdAssignment,
  MdOutlineHorizontalSplit,
  MdSettingsBackupRestore,
} from 'react-icons/md';
import { isSyntheticExpression } from 'typescript';

 import { useCart } from '../../hooks/useCart';
// import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
   const { cart, removeProduct, updateProductAmount } = useCart();
   const [contador, setContador] = useState(1)

 //const cartFormatted = cart.map((product) => ({

  //}))

  // const total =
  //   formatPrice(
  //     cart.reduce((sumTotal, product) => {
  //       // TODO
  //     }, 0)
  //  //// )
  function handleProductIncrement(product: Product){
    setContador(contador + 1)
  }

  //function handleProductDecrement(product: Product) {
    //product.amount + 1
  //}

  function handleRemoveProduct(productId: number) {
    // TODO
  }

  
  const setProduct = new Set()
  const filterCart = cart.filter((product)=> {
    const duplicatedProduct = setProduct.has(product.id) 
    setProduct.add(product.id) 
    return !duplicatedProduct         

  })

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {filterCart.map((product)=> (
          <tr data-testid="product">
                <td>
                  <img src={product.image} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>R$ {product.price}</span>
                </td>
                <td>
                  <div>

                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      //onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>

                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={product.id == 2 ? contador : 1}
                    />

                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>

                  </div>
                </td>
                <td>
                  <strong>R$ 359,90</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                  // onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>

          ))  }
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ 359,80</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
