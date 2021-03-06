import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func
  };

  handleChange = event => {
    event.currentTarget.value;

    // update that fish
    // This will tell us what have changed
    console.log(event.currentTarget.name);
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      // computed property names from ES6
      [event.currentTarget.name]: event.currentTarget.value
    };

    console.log(updatedFish);
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button
          onClick={() => {
            this.props.deleteFish(this.props.index);
          }}
        >
          Remove fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
