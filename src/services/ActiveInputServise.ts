
type Func = React.SetStateAction<any>; //any?
type Args = string | number | Func;  //дичь не дичь

type Add = (str: Args)=>void;
type Delete = (number: Args)=>void;
type Clear = ()=>void;
type SetActive = (func: Args)=>void;
type UnsetActive = (func: Args)=>void;

export type Actions = Add | Delete | Clear | SetActive | UnsetActive;




export interface ActiveInputServise {
  add: Actions;
  delete: Actions;
  clear: Actions;
  setActive: Actions;
  unsetActive: Actions;
}


let activeInput = null as Func;

export const ActiveInputServise : ActiveInputServise = {
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
    // console.log('activated');
  }, 
  unsetActive(func: Func) {
    if (activeInput == func) {
      activeInput = null;
    }
  }
}



















































