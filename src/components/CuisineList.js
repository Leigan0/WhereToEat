import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class CuisineList extends React.Component {
    numRestaurant() {
        if (this.props.numRestaurant > 0) {
            return <div> Number of Restaurants found: {this.props.numRestaurant}</div>
        }
    }
    render() {
        const cuisines = this.props.items
        const listCuisines = cuisines.map((i) => {
        return <ListItem button key={i} onClick={() => this.props.handleCuisineSelect(i)}>  {i}  <ListItemText /> </ListItem>
            })
        return (
            <div className="cuisineListMain">
                {listCuisines}
                <div className="numOfResults"> {this.numRestaurant()}</div>
            </div>
        )
    }

}

export default CuisineList;
