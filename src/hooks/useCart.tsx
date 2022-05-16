import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearTimeout } from 'timers';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    //const saveProduct = localStorage.setItem("@RocketShoes:cart", cart)
    const storagedCart = localStorage.getItem('@RocketShoes:cart')
    if (storagedCart) {
      //return JSON.parse(storagedCart)dddadaadadadad
    }

    return [];
  });
  const addProduct = async (productId: number) => {
    try {
      // Verificar se o produto já esta no carrinho.
      // Verificar se tem estoque do produto. 
      // Se estiver tudo certo eu retorno o produto 
      const { data } = await api.get(`/products/${productId}`)
      setCart([...cart, data]) 
    } catch {
      // TODO
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
