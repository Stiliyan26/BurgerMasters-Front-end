import * as cartService from '../services/cartService';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

const initialCount = 0;

export const CartProvider = ({
    children
}) => {
    const [cartItemsCount, setCartItemsCount] = useState(initialCount);
    const { token, user } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (user && token) {
            cartService.cartItemCount(token, user.userId)
            .then(res => {
                if (res.status === 200) {
                    setCartItemsCount(res.cartItemsCount)
                }
            })
            .catch(error => {
                console.log(error.message);
                navigate('/Internal-server-error');
            })
        }
    }, [user]);


    return (
        <CartContext.Provider value={ { cartItemsCount, setCartItemsCount } }>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const cartState = useContext(CartContext);

    return cartState;
}
