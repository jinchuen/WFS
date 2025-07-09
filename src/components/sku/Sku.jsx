import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Sku() {
	const [skuList, setSkuList] = useState([])

	useEffect(() => {
	const getSKUList = async () => {
		try {
		const response = await axios.get("http://127.0.0.1:8000/api/sku");
		console.log(response.data); // Handle your data here
		} catch (error) {
		console.error("Failed to fetch SKU list:", error);
		}
	};

	getSKUList();
	}, []);

  return (
	<>
	 <p>SKU</p>
	</>
  )
}
