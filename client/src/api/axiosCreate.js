import axios from 'axios';

// Add Base URL of API

export default axios.create({
	baseURL: `https://mmsoftware100.com/se2020`,
	timeout: 3000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json'
	}
});
