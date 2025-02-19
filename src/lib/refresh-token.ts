import { AxiosError } from 'axios'

import { http } from '@/lib/http'

export const refreshAccessToken = async (token: any) => {
	try {
		const res = await http.get('/auth/refresh-token', {
			headers: {
				'X-REFRESH-TOKEN': token.refreshToken
			}
		})

		const resData = res.data

		return {
			...token,
			accessToken: resData.data.accessToken,
			refreshToken: resData.data.refreshToken ?? token.refreshToken
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				...token,
				error: 'Refresh Access Token Error'
			}
		}
	}
}
