export type HotelPropertyType = {
	recordCount: number
	data: HotelPropertyViewType[]
}

export type HotelPropertyViewType = {
	id: number
	hotelName: string
	address1: string
	address2: string
	cityName: string
	stateCode: string
	countryName: string
	phoneNumber: string
	hotelChainName: string
	hotelBrandName: string
	lanyonId: string
	sabrePropertyId: string
	apolloPropertyId: string
	amadeusPropertyId: string
	worldspanPropertyId: string
}
