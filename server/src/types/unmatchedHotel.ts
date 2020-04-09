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
	address1: string
	address2: string
	city: string
	state: string
	country: string
	phonePrimary: string
}
