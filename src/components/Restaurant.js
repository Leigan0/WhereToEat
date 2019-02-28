import React from 'react';

class Restaurant extends React.Component {
    render() {
        const { location, average_cost_for_two, thumb, user_rating, menu_url, name } = this.props.restaurant

        return (
            <div className="restaurantContainer">
                <div className="container"><img src={thumb} alt="restThumb" /></div>
                <div>
                    <div className="name"> {name}</div>
                    <div className="location"> {location.address}</div>
                    <div className="avgCost">£{average_cost_for_two}</div>
                    <div className="userRating"> Avg user rating: {user_rating.aggregate_rating} Votes: {user_rating.votes}</div>
                    <a href={menu_url} className="rating">Menu</a>
                </div>
            </div>
        )
    }

}

export default Restaurant;