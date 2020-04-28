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

export const formatPhoneNumber = (phone) => {
	const match = phone
		.replace(/\D+/g, '')
		.replace(/^1/, '')
		.match(/([^\d]*\d[^\d]*){1,10}$/)[0]
	const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match
	const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : ''
	const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : ''
	return `${part1}${part2}${part3}`
}
