export class ApiTabs{

// const [ tabs, setTabs ] = useState<TabId[]>( [] )
// const [ activeTab, setActiveTab ] = useState<number>( () => {
// 	if ( !tabs.length ) return 0;
// 	return tabs[0].id
// } )

requestTab = ( url: string, method: string, body?: string ) => {
	return fetch( `http://10.13.16.80:4445/${ url }`, {
		method: method,
		body: body,
		headers: { 'Content-type': 'application/json' }
	} )
	.then( ( res ) => res.json() )
}
//
// useEffect( () => {
// 	requestTab( 'tab/list', 'GET' )
// 	.then( ( arrTabs ) => {
// 		setTabs( arrTabs )
// 		setActiveTab( () => {
// 			if ( !arrTabs.length ) return 0;
// 			return arrTabs[arrTabs.length - 1].id
// 		} )
// 	} )
// }, [] )
//
// const createTab = useCallback( () => {
// 	requestTab( 'create-tab', 'POST' )
// 	.then( ( tabId: any ) => setTabs( prevState => {
// 		if ( !tabId.id ) return prevState
// 		const newState = [ ...prevState, tabId.id ]
// 		setActiveTab( newState[newState.length - 1].id )
// 		return newState
// 	} ) )
// }, [ activeTab, tabs ] )
//
// const deleteTab = useCallback( () => {
// 	const body = JSON.stringify( { "id": `${ activeTab }` } )
// 	requestTab( 'delete-tab', 'DELETE', body )
// 	.then( ( res: any ) => setTabs( ( prevState ) => {
// 		if ( !res.affected ) return prevState
// 		const newState = prevState.filter( ( num ) => num.id !== activeTab )
// 		setActiveTab( () => {
// 			if ( !newState.length ) return 0;
// 			return newState[0].id
// 		} )
// 		return newState
// 	} ) )
// }, [ activeTab, tabs ] )


}