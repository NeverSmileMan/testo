
export interface ActiveInputService {
	add: (str: string) => void;
	delete: (str: string) => void;
	clear: () => void;
	setActive: (func: React.Dispatch<React.SetStateAction<string>>) => void;
	unsetActive: (func: React.Dispatch<React.SetStateAction<string>>) => void;
}

let activeInput = null as React.Dispatch<React.SetStateAction<string>> | null;

export const ActiveInputService : ActiveInputService = {
  add(str: string) {
    if (activeInput) activeInput((prevState: string)  => prevState+str);
  },
  delete(val = '1') {
    if (activeInput)  activeInput((prevState: string)  =>  prevState.substring(0, prevState.length - +val));
  }, 
  clear() {
    if (activeInput) activeInput((prevState: string)  => '');
  },
  setActive(func: React.Dispatch<React.SetStateAction<string>>) {
    activeInput = func;
  }, 
  unsetActive(func: React.Dispatch<React.SetStateAction<string>>) {
    if (activeInput === func) {
      activeInput = null;
    }
  }
}


// delete(val: string = '1') {
//   if (activeInput) {console.log('+val', typeof +val); activeInput((prevState: string)  => {
//     console.log('+val', typeof(prevState.length - +val), prevState.length - +val);
//     const x = prevState.length - +val;
//     return prevState.substring(0, x)})};
// }, 
















































