import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  removeCartItem: () => {},
  clickDecreaseQuantity: () => {},
  clickIncreaseQuantity: () => {},
})

export default CartContext
