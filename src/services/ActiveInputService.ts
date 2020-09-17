
export interface ActiveInputService {
	add: (str: string) => void;
	delete: (number: number) => void;
	clear: () => void;
	setActive: (func: React.Dispatch<React.SetStateAction<string>>) => void;
	unsetActive: (func: React.Dispatch<React.SetStateAction<string>>) => void;
}

let activeInput = null as React.Dispatch<React.SetStateAction<string>> | null;

export const ActiveInputService : ActiveInputService = {
  add(str: string) {
    if (activeInput) activeInput((prevState: string)  => prevState+str);
  },
  delete(val: number = 1) {
    if (activeInput) activeInput((prevState: string)  => prevState.substring(0, prevState.length - val));
  }, 
  clear() {
    if (activeInput) activeInput('');
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



















































