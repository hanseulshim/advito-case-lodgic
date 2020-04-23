export default `
type Currency {
  id: Int
	currencyName: String
	currencyCode: String
	currencySymbol: String
}

extend type Query {
  currencyList: [Currency] @auth
}
`
