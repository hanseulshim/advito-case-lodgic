export type UnmatchedHotelType = {
	pageCount: number
	data: UnmatchedHotelViewType[]
}

export type UnmatchedHotelViewType = {
	id: string
	bestMatchScore: number
	roomSpend: number
	hotelName: string
	hotelChainName: string
	templateCategory: string
	sourceName: string
	numberOfNights: number
	uploadTimestamp: string
	address1: string
	address2: string
	cityName: string
	stateCode: string
	countryName: string
	phoneNumber: string
}
