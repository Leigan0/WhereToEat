import React from 'react';

class CuisineList extends React.Component {
    render(){
        console.log(this.props)

        const items = this.props.cuisines
        const listItems = items.map((i) => <li key={i}> {i} </li>
        )
        return (
            <div className="cuisineListMain">
             <ol>{listItems}</ol>
            </div>
        )
    }

}

export default CuisineList;