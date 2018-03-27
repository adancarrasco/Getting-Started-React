import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const {params} = this.props.match;

    // First we reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)});
    }
    // We synch our state with Firebase database
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    // We remove the binding to prevent this from a memory leak since we will be
    // synching the state as we registered this action on the componentDidMount lifeCycle method
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    // ... takes a copy of an object in JavaScript
    const fishes = {...this.state.fishes};
    // 2. Add our new fish to fishes
    fishes[`fish${Date.now()}`] = fish;
    //3. Set the new fishes object to state
    this.setState({
      // In ES6 if your value and your property are named the same you don't need to do fishes: fishes
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // 2. Update the fish to fishes
    fishes[key] = updatedFish;
    // 3. Set the updated fishes object to state
    this.setState({fishes});
  };

  deleteFish = key => {
    // 1. Take a copy of the existing stte
    const fishes = {...this.state.fishes};
    // Set this to null because firebase needs it as null to remove the item
    fishes[key] = null;
    this.setState({fishes});
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = key => {
    // Spread syntax ...
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({
      order,
    });
  };

  removeFromOrder = key => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
