import React from "react";
import { formatPrice } from "../helpers";
import PropTypes from "prop-types";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }),
    addToOrder: PropTypes.func
  };

  handleClick = () => {
    // Even tough we are getting the key from the react component as key, that key value
    // is not accessible from the this context, that's why we need to send it as a different parameter (index)
    // with this we would be able to access it.
    this.props.addToOrder(this.props.index);
  };

  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? "Add to Cart" : "Sold out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
