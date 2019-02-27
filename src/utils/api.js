export default async () => {
    try {
        const response = await fetch(`https://developers.zomato.com/api/v2.1/location_details?entity_id=61054&entity_type=subzone`, {
            method: 'GET',
            headers: {
                'user-key': `${process.env.REACT_APP_API_KEY}`            }
        })
        if (response.status !== 200) {
			throw new Error('Unable to retrieve data from API');
		};

        return response.json()

    } catch (e) {
        console.error(e);
        return {
            error: `${e}`
        }
    }

}
