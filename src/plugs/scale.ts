import React from "react";

type Func = React.SetStateAction<any> | null; //any?

let setTara: Func = null;
let setTitle: Func = null;
let setPrice: Func = null;
let setWeight: Func = null;
let setTotal: Func = null;

export const ScalePlug = {

	setFuncs(...args: any) {
		setTara = args[0];
		setTitle = args[1];
		setPrice = args[2];
		setWeight = args[3];
		setTotal = args[4];
	},

	checkStable() {
		return true;
	},

	setTara(val: number) {
		if (setTara) setTara(val);
	},
	setTitle(str: string) {
		if (setTara) setTitle(str);
	},
	setPrice(val: any) {
		if (setPrice) setPrice(val);
	},
	setWeight(val: any) {
		if (setWeight) setWeight(val);
	},
	setTotal(val: any) {
		if (setTotal) setTotal(val);
	},

	getItemWeight() {
		const weight = (Math.floor(Math.random() * 200) + 40);
		this.setWeight(weight/1000);
		return weight;
	},

	getItemCost() {
		const cost = (Math.floor(Math.random() * 200) + 20);
		this.setTotal(cost);
		return cost;
	},

}
