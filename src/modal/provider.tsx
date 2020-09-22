import React, {Dispatch, SetStateAction} from 'react';

export function InnerElement() {
	const popUp = usePopUp();
	const onClick = React.useCallback(() => {
		popUp.setup(<div>Hello, world</div>, [<ClosePopUp key={0} />]);
	}, []);

	return (
		<div onClick={onClick} style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>
			Open modal!
		</div>
	);
}

const PopUp = React.createContext((null as any) as PopUpContext);

export const PopUpProvider: React.FC<{}> = ({ children }) => {
	const popUpNode = React.useState<JSX.Element | null>(null);
	const popUpControls = React.useState<JSX.Element[]>(() => []);
	const value = React.useMemo(() => new PopUpContext(popUpNode, popUpControls), [popUpNode, popUpControls]);
  const child = React.useMemo(() => React.Children.only(children), [children]);
	return (
		<PopUp.Provider value={value}>
			{child}
			<PopUpWindow control={value} />
		</PopUp.Provider>
	);
};

const PopUpWindow: React.FC<PopUpWindowProps> = ({ control }) => {
	const { node, controls } = control;
	if (node) {
		return (
			<div style={{position:'absolute', left:'0', top:'0', right:'0', bottom:'0', backgroundColor:'grey'}}>
				<div>{node}</div>
				<div>{controls}</div>
			</div>
		);
	} else {
		return null;
	}
};

export function usePopUp(): PopUpContext {
	return React.useContext(PopUp);
}

const ClosePopUp: React.FC<{}> = () => {
	const popUp = usePopUp();
	const onClick = React.useCallback(() => {
		popUp.setup(null);
	}, [popUp]);

	return <button onClick={onClick}>Close</button>;
};

interface PopUpWindowProps {
	control: PopUpContext;
}

class PopUpContext {
	private _node: [JSX.Element | null, Dispatch<SetStateAction<JSX.Element | null>>];
	private _controls: [JSX.Element[], Dispatch<SetStateAction<JSX.Element[]>>];

	public constructor(
		node: [JSX.Element | null, Dispatch<SetStateAction<JSX.Element | null>>],
		controls: [JSX.Element[], Dispatch<SetStateAction<JSX.Element[]>>],
	) {
		this._node = node;
		this._controls = controls;
	}
	public setup(node: JSX.Element | null, controls?: JSX.Element[]): void {
		const [_node, _setNode] = this._node;
		const [_controls, _setControls] = this._controls;

		_setNode(node);
		if (controls) {
			_setControls(controls);
		}
	}

  public close() {
    this.setup(null);
  }

	public get node(): JSX.Element | null {
		const [_node, _setNode] = this._node;
		return _node;
	}
	public get controls(): JSX.Element[] {
		const [_controls, _setControls] = this._controls;
		return _controls;
	}
}
