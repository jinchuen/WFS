import api from "../api"

const CATEGORY_URL = "/sku/category";

export const getCategory = {
	getCategoryList: async() => {
		const response = await api.get(CATEGORY_URL)
		if(response.data.result === 'success') {
			return response.data.data
		} else {
			throw new Error(response.data.message)
		}
	},
	createUpdateCategory: async(data) => {
		const response = await api.patch(CATEGORY_URL, data)
		if(response.data.result === 'success') {
			return response.data.data
		} else {
			throw new Error(response.data.message)
		}
	},
	deleteCategory: async(data) => {
		const response = await api.patch(CATEGORY_URL, data)
		if(response.status !== 204) {
			throw new Error(response.data.message)
		} else {	
			return;
		}
	}
}