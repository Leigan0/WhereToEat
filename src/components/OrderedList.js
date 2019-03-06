import React from "react";
import Restaurant from "./Restaurant";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

class OrderedList extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
        }
    }
    render() {
        return (
            <GridList cols={3}>
                {this.props.items.map(i => {
                    return (
                        <GridListTile key={i.restaurant.id}>
                            <Restaurant restaurant={i.restaurant} key={i.restaurant.id} />
                        </GridListTile>
                    );
                })}
            </GridList>
        );
    }
}

export default OrderedList;
