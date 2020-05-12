export const getFieldOrder = () => {
	return [
		'roomSpend',
		'numberOfNights',
		'hotelName',
		'address1',
		'address2',
		'cityName',
		'stateCode',
		'countryName',
		'phoneNumber',
		'hotelBrandName',
		'hotelChainName',
		'sabrePropertyId',
		'apolloPropertyId',
		'amadeusPropertyId',
		'worldspanPropertyId',
		'lanyonId',
	]
}

export const formatTitle = (field) => {
	const split = field.replace(/([a-z](?=[A-Z]))/g, '$1 ')
	const formatted = split.charAt(0).toUpperCase() + split.slice(1)

	if (formatted === 'Room Spend') {
		return 'Spend'
	} else if (formatted === 'Hotel Chain Name') {
		return 'Chain Name'
	} else if (formatted === 'Hotel Brand Name') {
		return 'Brand Name'
	} else if (formatted === 'Country Name') {
		return 'Country'
	} else if (formatted === 'State Code') {
		return 'State'
	} else if (formatted.includes('Property')) {
		return formatted.replace('Property', '')
	} else return formatted
}

export const moreMatchesFilters = [
	{
		label: 'Hotel Name',
		placeholder: 'Enter Hotel Name',
		value: 'hotelName',
	},
	{
		label: 'Address 1',
		placeholder: 'Enter Address',
		value: 'address1',
	},
	{
		label: 'City',
		placeholder: 'Enter City Name',
		value: 'cityName',
	},
	{
		label: 'State',
		placeholder: 'Enter State Code',
		value: 'stateCode',
	},
	{
		label: 'Country',
		placeholder: 'Enter Country Name',
		value: 'countryName',
	},
	{
		label: 'Chain Name',
		placeholder: 'Enter Hotel Chain Name',
		value: 'hotelChainName',
	},
	{
		label: 'Lanyon ID',
		placeholder: 'Enter Lanyon ID',
		value: 'lanyonId',
	},
	{
		label: 'Sabre ID',
		placeholder: 'Enter Sabre ID',
		value: 'sabrePropertyId',
	},
	{
		label: 'Apollo ID',
		placeholder: 'Enter Apollo ID',
		value: 'apolloPropertyId',
	},
	{
		label: 'Amadeus ID',
		placeholder: 'Enter Amadeus ID',
		value: 'amadeusPropertyId',
	},
	{
		label: 'Worldspan ID',
		placeholder: 'Enter Worldspan ID',
		value: 'worldspanPropertyId',
	},
	{
		label: 'HMF ID',
		placeholder: 'Enter HMF ID',
		value: 'id',
	},
]
