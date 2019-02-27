export default async (url) => {
    try {
        const response = await fetch(`${url}`, {
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
