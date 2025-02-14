import axios from 'axios'

export const http = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
	headers: {
		'Content-Type': 'application/json',
		'X-API-KEY': process.env.API_KEY,
		'X-PARTNER-CODE': process.env.PARTNER_CODE
	}
})
