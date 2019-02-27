import React from 'react';

class CuisineList extends React.Component {
    render(){
        const cuisines = this.props.items
        const listCuisines = cuisines.map((i) => <button key={i} onClick={() => this.props.handleCuisineSelect(i)}> {i} </button>
        )
        return (
            <div className="cuisineListMain">
                {listCuisines}
                
                <div> Number of Restaurants found: {this.props.numRestaurant}</div>

            </div>
        )
    }

}

export default CuisineList;