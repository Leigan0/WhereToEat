import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    image: {
        width: 128,
        height: 128,
        padding: 10
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    }
});

class Restaurant extends React.Component {
    render() {
        const {
            location,
            average_cost_for_two,
            thumb,
            user_rating,
            menu_url,
            name,
            photos_url
        } = this.props.restaurant;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className="container2">

                    <Grid container spacing={18}>
                        <Grid item>
                            <ButtonBase
                                className={classes.image}
                                target="_blank"
                                href={photos_url}
                            >
                                <img
                                    className={classes.img}
                                    alt="complex"
                                    src={
                                        thumb ||
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBW8x-HKfeTUdY4ELAWW8zU9EQ5KIAJ54HL-y7A2RQgh58_H6ZA"
                                    }
                                />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {name}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        <a
                                            href={`https://maps.google.com/?ll=${location.latitude},${
                                                location.longitude
                                                }`}
                                        >
                                            {location.address}
                                        </a>{" "}
                                    </Typography>
                                    <Typography>
                                        Avg user rating: {user_rating.aggregate_rating} Votes:{" "}
                                        {user_rating.votes}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ cursor: "pointer" }}>
                                        {" "}
                                        <a href={menu_url} className="rating">
                                            Menu
                    </a>{" "}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    £{average_cost_for_two}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
Restaurant.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Restaurant);
