export type UnmatchedHotelType = {
	pageCount: number
	data: UnmatchedHotelView[]
}

type UnmatchedHotelView = {
	id: string
	bestMatchScore: number
	roomSpend: number
	hotelName: string
	chainName: string
	templateCategory: string
	sourceName: string
	numberOfNights: number
	uploadTimestamp: string
	addressLine1: string
	addressLine2: string
	cityName: string
	stateCode: string
	countryName: string
	phoneNumber: string
}
