import React, { useState, useEffect } from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/styles';
import styles from '../../styles/controls/ControlButton';
import { Mode, State } from '../../data.structure/types/types';
import Modal from '../Modal';
// import { IStateWeights } from '../../data.structure/Weights';
import { IControlButton } from '../../data.structure/ControlButton';

export interface IControlButtonProps {
    object: IControlButton;
    ModalComponent: React.ComponentType<any> & StyledComponentProps;
    IconComponent: React.FunctionComponent<any>;
    text: string;
}

function createControlButton(props: IControlButtonProps) {
    const { object, ModalComponent, IconComponent, text } = props;

    const onClick = () => {
        object.doAction();
    }

    const getMode = () => ({ mode: object.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON });

    let setState: React.Dispatch<() => { mode: Mode }>;
    let mode: Mode;
    function changeState() {
        object.onChange(() => setState(getMode));
        return getMode();
    }

    type Props = {
        isActive?: boolean;
        onAction?: () => void;
        doAction?: (callback: () => void) => void;
        // data?: IStateWeights;
    } & WithStyles;

    function ControlButton({ classes, isActive, onAction, doAction }: Props) {
        [{ mode }, setState] = useState(changeState);
        
        useState(() => {
            object.onAction(onAction);
            if (doAction) doAction(object.doAction.bind(object));
        });

        useEffect(() => { !(isActive === undefined) && object.setActive(isActive) }, [isActive]);
        // useEffect(() => { 
        //     if (data && object.onDataChange) {
        //         object.onDataChange(data);
        //     }
        // }, [data]);

        const className = `${classes.wrapper} ${object.isActive() ? '' : classes.disabled}`;

        return (<>
            <div
                className={className}
                onClick={onClick}>
                <IconComponent />
                <div>{text}</div>
            </div>
            {mode === Mode.MODAL ?
            <Modal>
                <ModalComponent object={object} />
            </Modal> : null
            }
        </>);
    }

    return withStyles(styles)(ControlButton);
}

export default createControlButton;
