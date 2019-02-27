import React from 'react';

class OrderedList extends React.Component {
    render(){
        const items = this.props.items
        const id = 1
        const listItems = items.map((i) => <li key={ i.key || i + id}> {i.name || i} </li>
        )
        return (
            <div className="cuisineListMain">
                <ol>{listItems}</ol>
            </div>
        )
    }

}

export default OrderedList;