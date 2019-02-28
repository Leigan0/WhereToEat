import React from 'react';
import Restaurant from './Restaurant'

class OrderedList extends React.Component {
    render(){
        const items = this.props.items
        const listItems = items.map((i) => <Restaurant restaurant={i.restaurant} key={ i.restaurant.id}/>
        )
        return (
            <div className="cuisineListMain">
                <div>{listItems}</div>
            </div>
        )
    }

}

export default OrderedList;