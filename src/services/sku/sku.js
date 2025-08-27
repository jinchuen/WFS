import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api/sku"

export const Sku = {
	getSkuList: async(params = {}) => {
		const queryParams = new URLSearchParams()
		
		// Add pagination and filter parameters
		if (params.pageNumber) queryParams.append('pageNumber', params.pageNumber)
		if (params.pageSize) queryParams.append('pageSize', params.pageSize)
		if (params.code) queryParams.append('code', params.code)
		if (params.descs) queryParams.append('descs', params.descs)
		if (params.categoryId) queryParams.append('categoryId', params.categoryId)
		
		const url = queryParams.toString() ? `${API_URL}?${queryParams.toString()}` : API_URL
		const response = await axios.get(url, {
			headers: {
				'Accept': 'application/json',
			},
			// This might help with custom headers
			withCredentials: false
		})
		
		if(response.data.result === 'success') {
			// Helper function to get header value with fallbacks
			const getHeaderValue = (headerName) => {
				const variations = [
					headerName,
					headerName.toLowerCase(),
					headerName.toUpperCase()
				];
				
				for (const variation of variations) {
					const value = response.headers[variation];
					if (value !== undefined && value !== null) {
						return value;
					}
				}
				return null;
			};
			
			// Extract pagination info from headers
			const paginationInfo = {
				totalCount: parseInt(getHeaderValue('X-Total-Count')) || 0,
				totalPages: parseInt(getHeaderValue('X-Total-Pages')) || 1,
				currentPage: parseInt(getHeaderValue('X-Current-Page')) || 1,
				hasNextPage: getHeaderValue('X-Has-Next-Page') === 'true',
				hasPrevPage: getHeaderValue('X-Has-Prev-Page') === 'true'
			}
			
			return {
				data: response.data.data,
				pagination: paginationInfo
			}
		} else {
			throw new Error(response.data.message)
		}
	},
	createUpdateSku: async(data) => {
		const response = await axios.patch(API_URL, data)
		if(response.data.result === 'success') {
			return response.data.data
		} else {
			throw new Error(response.data.message)
		}
	},
	deleteSku: async(data) => {
		const response = await axios.patch(API_URL, data)
		if(response.status !== 204) {
			throw new Error(response.data.message)
		} else {
			return;
		}
	},
}