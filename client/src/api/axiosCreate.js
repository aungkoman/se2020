import axios from 'axios';

// Add Base URL of API

export default axios.create({
	baseURL: `localhost/se2020`,
	timeout: 30000
});


