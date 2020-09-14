import React, { useState, useEffect } from 'react';
import {
    WithStyles, withStyles } from '@material-ui/core/styles';
import styles from '../../styles/controls/ControlButton';
import { StyledComponentProps } from '@material-ui/styles';
import { Mode, State } from '../../data.structure/types/types';
// import ModalService from '../../data.structure/ModalService';
import Modal from '../Modal';

// const modalService = ModalService.getInstance();

export interface IControlButtonProps {
    object: {
        doAction: Function;
        onAction: Function;
        onChange: Function;
        isActive: Function;
        getState: Function;
        setActive: (isActive: boolean) => void;
    },
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

    // function showModal(mode: Mode) {
    //     if (mode === Mode.MODAL)
    //         modalService.showModal(<ModalComponent />);
    //     else modalService.showModal(null);
    // }

    type Props = {
        isActive?: boolean;
        onAction?: () => void;
    } & WithStyles;

    function ControlButton({ classes, isActive, onAction }: Props) {
        [{ mode }, setState] = useState(changeState);
        useState(() => object.onAction(onAction));
        // useEffect(() => showModal(mode), [mode]);
        // isActive && object.setActive(isActive);
        useEffect(() => { isActive && object.setActive(isActive)}, [isActive]);
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
                <ModalComponent />
            </Modal> : null
            }
        </>);
    }

    return withStyles(styles)(ControlButton);
}

export default createControlButton;
