import React from 'react';
import Restaurant from './Restaurant'

class OrderedList extends React.Component {
    render(){
        const items = this.props.items
        const id = 1
        const listItems = items.map((i) => <li key={ i.restaurant.id || i + id}> <Restaurant restaurant={i.restaurant}/>  </li> 
        )
        return (
            <div className="cuisineListMain">
                <ol>{listItems}</ol>
            </div>
        )
    }

}

export default OrderedList;