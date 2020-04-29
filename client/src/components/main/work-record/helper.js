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
