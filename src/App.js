import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  clickIncreaseQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
    }))
  }

  clickDecreaseQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id && eachItem.quantity > 1) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      }),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product
    const filteredItem = cartList.filter(eachItem => eachItem.id === id)
    if (filteredItem.length > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          console.log(eachItem)
          if (eachItem.id === id) {
            return {...eachItem, quantity: eachItem.quantity + product.quantity}
          }
          return eachItem
        }),
      }))
    } else {
      console.log(product)
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)

    this.setState({cartList: filteredCartList})
  }

  removeCartItem = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            removeCartItem: this.removeCartItem,
            clickDecreaseQuantity: this.clickDecreaseQuantity,
            clickIncreaseQuantity: this.clickIncreaseQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
