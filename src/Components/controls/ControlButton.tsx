import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/styles';
import styles from '../../styles/controls/ControlButton';
import { Mode } from '../../data.structure/types/types';
import Modal from '../Modal';
import { IControlButton } from '../../data.structure/ControlButton';
import getHookControlButton from '../../hooks/ControlButton';

export interface IControlButtonProps {
    object: IControlButton;
    ModalComponent: React.ComponentType<any> & StyledComponentProps;
    IconComponent: React.FunctionComponent<any>;
    text: string;
}

function createControlButton(props: IControlButtonProps) {
    const { object, ModalComponent, IconComponent, text } = props;
    const { onClick, setActive, useControlButton } = getHookControlButton(object);

    type Props = {
        isActive?: boolean;
        onAction?: () => void;
        doAction?: (callback: () => void) => void;
    } & WithStyles;

    function ControlButton({ classes, isActive, onAction, doAction }: Props) {
        const { mode, currentIsActive } = useControlButton(onAction, doAction);
        useEffect(() => setActive(isActive), [isActive]);

        const className = `${classes.wrapper} ${currentIsActive ? '' : classes.disabled}`;

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
