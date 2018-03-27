import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  // This is an option to bind an method to the React Component
  // Using the bind however as this would make it too dirty when having
  // multiple method the property way has been implemented (using arrow function).
  // constructor() {
  //   super();
  //   console.log("Gonna create a component");
  //   this.goToStore = this.goToStore.bind(this);
  // }
  inputStoreName = React.createRef();

  goToStore = oClientEvent => {
    oClientEvent.preventDefault();
    // Get the input value
    const storeName = this.inputStoreName.value.value;
    // Change the page to /store/whatever-url
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter A Store</h2>
          <input
            type="text"
            ref={this.inputStoreName}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
