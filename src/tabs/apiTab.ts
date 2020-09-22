export default class TabApi {

	_apiBase = `http://10.13.16.80:4445`;

	getResponce = async ( url: string ) => {
		const result = await fetch( `${ this._apiBase }/${ url }` );

		if ( !result.ok ) {
			throw new Error( `Could not fetch ${ url }, received ${ result.status } ` )
		}
		return await result.json()
	}

	createTab = async (): Promise<any> => {
		fetch( `${ this._apiBase }/create-tab`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		} )
		.then( ( res ) => res.json() )
	}

	deleteTab = async ( id: string ): Promise<any> => {
		fetch( `${ this._apiBase }/delete-tab`, {
			method: 'DELETE',
			body: id,
			headers: {
				'Content-Type': 'application/json'
			}
		} )
		.then( ( res ) => res.json() )
	}

	listTab = async (): Promise<Array<string>> => await this.getResponce(`tab/list`)

}
