import React, { Component } from "react";

import BOOKS from '../../../ecs'
import './Detail.css'
import CARTICON from '../../../Presentational/CartIcon/CartIcon'


class Detail extends Component {
    state = {
      bookId: this.props.match.params.id,
      LIST: BOOKS.map(list => {
        return {
            ...list,
            addToCart: ''
        }
    }),
      Detail: {}
    };
  
    componentDidMount() {
        BOOKS.map(list => {
          if(list.bookID === +this.props.match.params.id ) {
            return this.setState({Detail:list})
          }
        })
    }
  
    clickHandler = () => {
      this.props.history.push(`/cart`);
    };
  
    addToCart = (id) => {
      let cart = []
      if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      let flag = false
      if(cart.length === 0) {
        flag = false
      } else {
        cart.map(data => {
          if(data.bookID === +id) {
            flag = true
            return data.quantity++
          }
        })
      }
      if(flag === false) {
        let newCart = {...this.state.Detail}
        newCart.quantity = 1
        cart.push(newCart)
      }
      console.log(cart)
      localStorage.setItem('cart', JSON.stringify(cart))
      var x = document.getElementById("snack");
      x.className = "show";
      setTimeout(() => {
        x.className = x.className.replace("show", "");
      }, 3000);
    };
  
    removedfromCart = (id) => {
      console.log(id)
      var x = document.getElementById("snackrem");
      x.className = "show";
      setTimeout(() => {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  
    render() {
      let remove
      let cart = []
      if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      if(cart.length !== 0) {
        cart.map(data => {
          if(data.bookID === +this.props.match.params.id) {
            remove = <button className="plusminus" style={{marginLeft: '10px'}}
          value={this.state.Detail.bookID}
          onClick={(event) => this.removedfromCart(event.target.value)}>
            -
            </button>
          }
        })
      }
      return (
        <>
         <CARTICON click={this.clickHandler} />
        <div className="Detail">
            <p style={{fontWeight:'bold', fontSize: '25px'}}>{this.state.Detail.title}</p>
        <p><span style={{fontWeight:'bold'}}>Author: </span>{this.state.Detail.authors}</p>
        <p><span style={{fontWeight:'bold'}}>Rating:  </span>{this.state.Detail.average_rating} *({this.state.Detail.ratings_count})</p>
        <p><span style={{fontWeight:'bold'}}>Price:  </span>{this.state.Detail.price}</p>
        <button className="plusminus"
                value={this.state.Detail.bookID}
                onClick={(event) => this.addToCart(event.target.value)}
              >
                +
              </button>
              {remove}
        </div>
        <a 
        className="home" href='/'>
            Go to home page</a>
        <div id="snack" >Added to cart</div>
        <div id="snackrem" >Removed from cart</div>
        </>
      );
    }
  }
  
  export default Detail;