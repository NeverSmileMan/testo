import React, {createContext, FC, useState} from 'react';
import {ITab} from "./header/Tab";



export const TabsContext= createContext({})


const  TabsProvider: FC = ({children}) => {

	const [tabs, setTabs] = useState([{active: true, tabNumber: 1, tara: 0} as ITab])

  return (
	  <TabsContext.Provider value={tabs}>
		  {children}
	  </TabsContext.Provider>
  );
};

export default TabsProvider;
