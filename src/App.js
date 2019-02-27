import React, { Component } from 'react';
import getRestaurants from './utils/api';
import CuisineList from './components/CuisineList';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        numRestaurant: "",
        topCuisines: [],
        bestRatedRestaurant: [],
        location: ""
    }
  }

  async componentWillMount() {
      const results = await getRestaurants()
      const { location, top_cuisines, best_rated_restaurant, num_restaurant} = results
      this.setState({
        numRestaurant: num_restaurant,
        bestRatedRestaurant: best_rated_restaurant,
        topCuisines: top_cuisines,
        location
      })
    }

  render() {
    return (
      <div className="App">
        <div className="top_cuisines">
          <CuisineList cuisines={this.state.topCuisines}/>
        </div>
      </div>
    );
  }
}

export default App;
