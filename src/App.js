import React, { Component } from 'react';
import apiData from './utils/api';
import OrderedList from './components/OrderedList';
import CuisineList from './components/CuisineList'
import Header from './components/Header';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        numRestaurant: "",
        cuisines: [],
        bestRatedRestaurant: [],
        location: "",
        restaurantList: [],
        filteredResults: [],
        hasFiltered: false

    }
  }

  async componentDidMount() {
      const locationResults = await apiData(process.env.REACT_APP_LOCATION_URL)
      const restaurantsInArea = await apiData(process.env.REACT_APP_RESTAURANT_URL)
      const { location, best_rated_restaurant} = locationResults
      const { restaurants } = restaurantsInArea
      const cuisines = this.filterCuisines(restaurants);

      this.setState({
        bestRatedRestaurant: best_rated_restaurant,
        location,
        restaurantList: restaurants.concat(best_rated_restaurant),
        cuisines,
      })
    }
    
    handleCuisineSelect = e => {
      const sortedRestaurants = this.state.restaurantList.filter((i) => {
        const cuisines = i.restaurant.cuisines.split(",").map((i)=> i.trim())
        return cuisines.includes(e)
      })
      this.setState({
        filteredResults: sortedRestaurants,
        hasFiltered: true
      })
    }

    filterCuisines(list){
      const cuisines = []

      list.map((i) => {
        return i.restaurant.cuisines.split(",").map( (i) => cuisines.push(i.trim()) )
      })

      const uniq = [...new Set(cuisines)]
      return uniq
    }

    getRestaurantList(list){
      const names = []
      const objs = []
      list.forEach( (item) =>  {
        if (!names.includes(item.restaurant.name)){
          objs.push({ name: item.restaurant.name, key: item.restaurant.id })
          names.push(item.restaurant.name)
        }
      })
      return objs;
    }

  render() {
    return (
      <div className="App">
        <div className="header">
          <header>
            <Header location={this.state.location} numRestaurant={this.state.restaurantList.length}/>
          </header>
        </div>
        <div className="sortBy">
          <h1> Sort by Cuisine </h1>
          <CuisineList items={this.state.cuisines} handleCuisineSelect={this.handleCuisineSelect} numRestaurant={this.state.filteredResults.length} hasFiltered={this.state.hasFiltered}/>
        </div>
        <div className="results">
          <OrderedList items={this.getRestaurantList(this.state.filteredResults)}/>
        </div>
        <div className="topRestaurants">
          <h1> Top Rated Restaurants in the area </h1>
          <OrderedList items={this.getRestaurantList(this.state.bestRatedRestaurant)}/>
        </div>
      </div>
    );
  }
}

export default App;
