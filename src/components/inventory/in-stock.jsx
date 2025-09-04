import React, { useState, useEffect } from 'react'
import { Sku as SkuService } from '../../services/sku/sku';
import { toast } from 'react-toastify'
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import PopperProps from '@mui/material/Popper';

const InStock = () => {
	const [skuList, setSkuList] = useState([]);
	const [originalSkuList, setOriginalSkuList] = useState([]);

	const [ formData, setFormData] = useState({
	expectedArrivedDate: '',
	replaceQuantity: '',
	skuPartsId: '',
	skuItems: []   // 👈 array of { skuId, price, orderQuantity }
	})

	useEffect(() => {
        fetchSkuData();
    }, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'skuItems')
		setFormData(prev => ({
		...prev,
		[name]: value
		}));
	};

	const handleSkuChange = (value, index) => {
		setFormData(prev => {
			const skuItems = prev.skuItems.map((item, i) =>
			i === index
				? { ...item, skuId: value?.id ?? '', sku: value ?? null }
				: item
			);

			// filter SKU list directly
			filterValidSku(skuItems)

			return { ...prev, skuItems };
		});
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const fetchSkuData = async() =>{
		try {
			const skuRes = await SkuService.getSkuList()
			setSkuList(skuRes.data);
			setOriginalSkuList(skuRes.data);
		} catch {
			toast.error("An unknown error occurred while fetching sku data. Please try again later.")
		}
	}

	function filterValidSku(skuItems) {
		console.log('skuItems', skuItems);
		const selectedIds = skuItems.map(item => item.skuId);
		const filteredSkuList = originalSkuList.filter(sku => !selectedIds.includes(sku.id));
		setSkuList(filteredSkuList);
	}

  return (
	<div className='p-3'>
		<div className='flex items-center justify-between'>
			<h2 className='text-3xl text-white font-extrabold'> Inventory In Stock</h2>
			<button className="btn btn-soft btn-success" onClick={() => document.getElementById('my_dialog_1').showModal()}> 
				<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
				</svg>
				Add new record
			</button>
		</div>



		<dialog id='my_dialog_1' className='modal'>
			<div className="modal-box w-300 max-w-5xl">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<h3 className="font-bold text-lg">Add New In Stock Record</h3>
				
				<form onSubmit={handleSubmit} className="grid gap-4 border rounded p-7 w-full my-4">
				{/* Expected Arrived Date */}
				<div className="grid grid-cols-1 gap-4 w-full">
					<div className="form-control w-full">
						<label className="label"><span className="label-text">Expected Arrived Date</span></label>
						<input type="date" placeholder="Expected Date" onChange={handleChange} value={formData.expectedArrivedDate} name="expectedArrivedDate"
						className="input w-full border-0 border-b-2 border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-none"/>
					</div>
				</div>

			{/* SKU Section */}
			<div>
			<h3 className='font-bold text-md'>SKU Info</h3>

			{/* SKU Rows */}
			{(formData.skuItems || []).map((item, index) => (
			<div key={index} className="grid grid-cols-3 gap-4 items-end border p-3 my-2 rounded-md relative">

				{/* Select SKU */}
				<div className='form-control w-full'>
				<label className='label'> <span className='label-text'>Select a sku</span></label>
				<Autocomplete
					options={skuList || []}
					groupBy={(option) => option.category?.code || "No Category"}
					getOptionLabel={(option) => option.code || ""}
					disablePortal={true}
					value={formData.skuItems[index]?.sku || null} 
					onChange={(_e, value) => { handleSkuChange(value, index);}}
					renderInput={(params) => (
					<div ref={params.InputProps.ref}>
						<input
						type="text"
						{...params.inputProps}
						placeholder="Select Item"
						className="select w-full border-0 border-b-2 border-gray-300 rounded-none 
							focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-none"
						/>
					</div>
					)}
				/>
				</div>

				{/* Price */}
				<div className='form-control w-full'>
				<label className='label'> <span className='label-text'>Price</span></label>
				<input type="number" placeholder='Price of SKU'
					value={item.price}
					onChange={(e) => {
					const newItems = [...formData.skuItems];
					newItems[index].price = e.target.value;
					setFormData({ ...formData, skuItems: newItems });
					}}
					className="input w-full border-0 border-b-2 border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-none"
				/>
				</div>

				{/* Order Quantity */}
				<div className='form-control w-full'>
				<label className='label'> <span className='label-text'>Order Quantity</span></label>
				<input type="number" placeholder='Order Quantity'
					value={item.orderQuantity}
					onChange={(e) => {
					const newItems = [...formData.skuItems];
					newItems[index].orderQuantity = e.target.value;
					setFormData({ ...formData, skuItems: newItems });
					}}
					className="input w-full border-0 border-b-2 border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-none"
				/>
				</div>

				{/* Remove Button */}
				<button type="button"
				className="btn btn-error btn-sm absolute -top-2 -right-2"
				onClick={() => {
					const newItems = formData.skuItems.filter((_, i) => i !== index)
					setFormData({ ...formData, skuItems: newItems });
					filterValidSku(newItems);

				}}
				>
				✕
				</button>
			</div>
			))}

			<div className='flex flex-row items-center justify-center gap-2'>
				<button type="button" className='btn btn-info w-13/15'
				onClick={() =>
					setFormData(prev => ({
					...prev,
					skuItems: [...(prev.skuItems || []), { skuId: '', price: '', orderQuantity: '' }]
					}))
				}>
				Add New Sku Field
				</button>
			</div>
			</div>

			<div className='flex flex-row items-center justify-center gap-2'>
				<button className='btn btn-success'>Add</button>
				<button className='btn btn-success'>Add</button>
			</div>
			</form>
			</div>
		</dialog>

	</div>
  )
}

export default InStock