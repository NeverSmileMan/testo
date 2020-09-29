export class ApiTabs{

requestTab = ( url: string, method: string, body?: string ) => {
	return fetch( `http://10.13.16.80:4445/${ url }`, {
		method: method,
		body: body,
		headers: { 'Content-type': 'application/json' }
	} )
	.then( ( res ) => res.json() )
}

// 	1. POST /create-tab -> возвращает id таба или ошибку если их уже 6
// 	2. DELETE /delete-tab на вход в бади ожидает айди таба { id: `<id>` }
// 3. POST /create-order-row на вход в бади ожидает айди таба { id: `<id>` }
// 4. PATCH /update-order-row в бади ожидает айди ордера и в свойстве дата обновленный обьект товара { id: `<id>`, data: `<data>` }
// 5. DELETE /delete-order-row на вход в бади ожидает айди ордера { id: `<id>` }
// 6. GET /tab/:id получить все товары в табе по айди в параметрах
// 7. GET /tab/list -> получить все табы
}