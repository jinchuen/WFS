import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api/sku/category"

export const getCategory = {
	getCategoryList: async() => {
		const response = await axios.get(API_URL)
		if(response.data.result === 'success') {
			return response.data.data
		} else {
			throw new Error(response.data.message)
		}
	}
}