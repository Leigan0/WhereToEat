import React from 'react';

class Header extends React.Component {
    render(){
        const { title, country_name } = this.props.location
        return (
            <div className="header">
                <div> Location: {title}, {country_name}.</div> 
                <div> Number of Restaurants found: {this.props.numRestaurant}</div>
            </div>
        )
    }

}

export default Header;