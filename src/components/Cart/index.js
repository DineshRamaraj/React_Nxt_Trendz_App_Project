import CartContext from '../../context/CartContext'

import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeCartItem} = value

      const showEmptyCartView = cartList.length === 0

      const removeElement = cartList.length === 1 ? 'Remove' : 'Remove all'

      const totalCartList = cartList.map(
        eachItem => eachItem.quantity * eachItem.price,
      )
      let totalCartPrice = 0

      for (let i = 0; i < totalCartList.length; i += 1) {
        totalCartPrice += totalCartList[i]
      }
      console.log(totalCartPrice)

      const onClickRemoveItem = () => {
        removeCartItem()
      }

      return (
        <>
          <Header />
          {showEmptyCartView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="cart-heading-remove-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <p className="cart-remove-button" onClick={onClickRemoveItem}>
                    {removeElement}
                  </p>
                </div>
                <CartListView />
                <div className="main-order-container">
                  <div className="order-container">
                    <div className="order-heading-container">
                      <p className="order-heading">Order Total: </p>
                      <h1 className="order-total-heading">
                        Rs {totalCartPrice} /-
                      </h1>
                    </div>
                    <p className="order-items">
                      {cartList.length} items in cart
                    </p>
                    <button type="button" className="order-checkout-button">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
