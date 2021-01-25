import React, { Component } from "react";

import BOOKS from '../../../ecs'
import "./ListData.css";
import CARTICON from '../../../Presentational/CartIcon/CartIcon'

class listData extends Component {
    state = {
      LIST: BOOKS.map(list => {
          return {
              ...list,
              addToCart: ''
          }
      }),
      keys: [],
      searchTerm: "",
      cart: []
    };

    componentDidMount() {
        setTimeout(() => {
        this.setState({keys:Object.keys(this.state.LIST[0])})
        })
    }

    renderTableData = () => {
        return this.state.LIST.map((book, index) => {
          const {
            bookID,
            title,
            authors,
            average_rating,
            isbn,
            language_code,
            price,
            ratings_count,
          } = book;
          const star = [];
          for (let i = 1; i <= average_rating; i++) {
            star.push(<span key={i}>*</span>);
          }
          if (this.state.searchTerm === "") {
            return (
              <tr key={bookID}>
                <td>
                  <a id="clickable" href={"/detail/" + bookID}>
                    <span id="tooltiptext">detail page</span>
                    {bookID}
                  </a>
                </td>
                <td>{title}</td>
                <td>{authors}</td>
                <td>{star}</td>
                <td>{isbn}</td>
                <td>{language_code}</td>
                <td>{ratings_count}</td>
                <td>{price}</td>
                <td>
                  <button
                    value={bookID}
                    className="addToCart"
                    onClick={(event) => this.addToCart(event.target.value)}
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            );
          } else if (
            title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
          ) {
            return (
              <tr key={bookID}>
                <td>
                  <a id="clickable" href={"/detail/" + bookID}>
                    <span id="tooltiptext">detail page</span>
                    {bookID}
                  </a>
                </td>
                <td>{title}</td>
                <td>{authors}</td>
                <td>{star}</td>
                <td>{isbn}</td>
                <td>{language_code}</td>
                <td>{ratings_count}</td>
                <td>{price}</td>
                <td>
                  <button
                    value={bookID}
                    className="addToCart"
                    onClick={(event) => this.addToCart(event.target.value)}
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            );
          }
        });
      };

    renderTableHeader = () => {
        return this.state.keys.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>;
        });
      };

      sort = (value) => {
        if (value === "price") {
          this.setState((prevstate) => {
            return this.state.LIST.sort((a, b) => {
              return a.price - b.price;
            });
          });
        } else if (value === "name") {
          this.setState((prevstate) => {
            return this.state.LIST.sort((a, b) => {
              let x = a.title.toLowerCase();
              let y = b.title.toLowerCase();
              if (x < y) {
                return -1;
              }
              if (x > y) {
                return 1;
              }
            });
          });
        }
      };

      addToCart = (id) => {
        let updatedCart = []
        if(localStorage.getItem('cart')) {
          updatedCart = JSON.parse(localStorage.getItem('cart'))
        }
        let flag = false
        this.state.LIST.map(book => {
          const {bookID} = book
          if(bookID === +id) {
            if(updatedCart.length === 0) {
              book.quantity = 1
              flag = true
              updatedCart.push(book)
            } else updatedCart.map(prod => {
              if(prod.bookID === +id) {
                flag = true
                prod.quantity++
              }
            })
            if(!flag) {
              book.quantity = 1
              updatedCart.push(book)
            }
          }
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
      };

      clickHandler = () => {
        this.props.history.push(`/cart`);
      };

    

      render() {
          return(
              <>
              <CARTICON click={this.clickHandler} />
              <input
          placeholder="Search By Title"
          onChange={(event) =>
            this.setState({ searchTerm: event.target.value })
          }
          type="text"
        />
        <select onChange={(event) => this.sort(event.target.value)}>
          <option id="default" value="default">
            Select to sort
          </option>
          <option id="price" value="price">
            Sort by Price
          </option>
          <option id="name" value="name">
            Sort By Name
          </option>
        </select>
              <table id="students">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        <div id="snackbar">Added to cart</div>
              </>
          )
      }

}

export default listData

