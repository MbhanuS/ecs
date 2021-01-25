import React, { Component } from 'react'

import './Cart.css'

class Cart extends Component {
    state = {
        cart: JSON.parse(localStorage.getItem('cart'))
    }

    checkOutHandler = () => {
        alert('Thank you for purchasing, your books will be delivered very soon')
        this.props.history.push('/')
        localStorage.removeItem('cart')
    }
    render() {

        let checkOutButton = <div style={{fontWeight: 'bold', fontSize: '50px', textAlign:'center', color: 'red'}}>
            <div >
                Your cart is empty</div>
                <a style={{color:'blue',cursor:'pointer'}} href='/'>Go to home page?</a>
        </div>
        if(localStorage.getItem('cart')) {
            checkOutButton = <button onClick={this.checkOutHandler} className="checkout">Checkout</button>
        }


        let cartData = [<p style={{fontWeight: 'bold', fontSize: '50px', textAlign:'center', color: 'yellow', backgroundColor: 'black'}}>Cart</p>]
        if(this.state.cart) {
            this.state.cart.map(prod => {
                cartData.push(<div className="card" style={{ fontSize: '30px', textAlign:'center'}}>
                <div><span style={{fontWeight: 'bold'}}>Book: </span><p style={{display:'inline'}}>{prod.title}</p></div>
                <div><span style={{fontWeight: 'bold'}}>Price: </span><p style={{display:'inline'}}>{prod.price}</p></div>
                <div><span style={{fontWeight: 'bold'}}>quantity:</span><p style={{display:'inline'}}>{prod.quantity}</p></div>
                </div>)
            })
        }
        
        return (
            <>
            {cartData}
            {checkOutButton}
            </>
        )
    }
}

export default Cart