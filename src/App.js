import React, { Component } from 'react';
import apiData from './utils/api';
import OrderedList from './components/OrderedList';
import CuisineList from './components/CuisineList'
import Header from './components/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        city_id: 61,
        city_name: "London",
        country_name: "United Kingdom",
        entity_id: 61054,
        entity_type: "subzone",
        latitude: 51.505217,
        longitude: -0.087469,
        title: "London Bridge, London"
      },
      numRestaurant: "",
      cuisines: [],
      bestRatedRestaurant: [],
      restaurantList: [],
      filteredResults: [],
      isFiltered: false,
      userLocation: 'Keyword or area & city',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getApiData()

  }

    async getApiData() {
      const locationResults = await apiData(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${this.state.location.entity_id}&entity_type=${this.state.location.entity_type}`)
      const restaurantsInArea = await apiData(`https://developers.zomato.com/api/v2.1/search?lat=${this.state.location.latitude}&lon=${this.state.location.longitude}&sort=real_distance&order=asc`)
      const { location, best_rated_restaurant } = locationResults
      const { restaurants } = restaurantsInArea

      const cuisines = this.filterCuisines(restaurants);
      this.setState({
        bestRatedRestaurant: best_rated_restaurant,
        location,
        restaurantList: restaurants.concat(best_rated_restaurant),
        cuisines,
      })

  }

  handleChange = e => {
    this.setState({
      userLocation: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const location = this.state.userLocation

    const url = `https://developers.zomato.com/api/v2.1/locations?query=${location}`
    const resp = await apiData(url)
    const { location_suggestions } = resp 
    const locationData = location_suggestions[0]

    this.setState({
      location: locationData,
      filteredResults:[]
    })
    this.getApiData()
    }


  handleCuisineSelect = e => {
    const sortedRestaurants = this.state.restaurantList.filter((i) => {
      const cuisines = i.restaurant.cuisines.split(",").map((i) => i.trim())
      return cuisines.includes(e)
    })

    const uniq = this.removeDuplicates(sortedRestaurants)

    this.setState({
      filteredResults: uniq,
    })
  }

  filterCuisines(list) {
    const cuisines = []

    list.map((i) => {
      return i.restaurant.cuisines.split(",").map((i) => cuisines.push(i.trim()))
    })

    const uniq = [...new Set(cuisines)]
    return uniq
  }

  removeDuplicates(list) {
    const names = []
    const objs = []
    list.forEach((item) => {
      if (!names.includes(item.restaurant.name)) {
        objs.push(item)
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
            <Header location={this.state.location} numRestaurant={this.state.restaurantList.length} />
            <form onSubmit={this.handleSubmit}>
            <label>
              Want to eat somewhere else? 
              <input type="text" value={this.state.userLocation} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </header>
        </div>
        <div className="sortBy">
          <h1> Sort by Cuisine </h1>
          <CuisineList items={this.state.cuisines} handleCuisineSelect={this.handleCuisineSelect} numRestaurant={this.state.filteredResults.length} />
        </div>
        <div className="results">
          <OrderedList items={this.state.filteredResults} />
        </div>
        <div className="topRestaurants">
        <h1> Top Rated Restaurants in the area </h1>
        <OrderedList items={this.state.bestRatedRestaurant} />
      </div>
      </div>
    );
  }
}

export default App;
