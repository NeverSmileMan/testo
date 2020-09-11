type Func = React.SetStateAction<any> | null; //any?

export interface ActiveInputService {
  add: (str: string)=>void;
  delete: (number: number)=>void;
  clear: ()=>void;
  setActive: (func: Func)=>void;
  unsetActive: (func: Func)=>void;
}

let activeInput = null as Func;

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
  setActive(func: Func) {
    activeInput = func;
  }, 
  unsetActive(func: Func) {
    if (activeInput === func) {
      activeInput = null;
    }
  }
}



















































