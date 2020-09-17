import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/styles';
import styles from '../../styles/controls/ControlButton';
import { Mode } from '../../data.structure/types/types';
import Modal from '../Modal';
import { IControlButton } from '../../data.structure/ControlButton';
import getHookControlButton from '../../hooks/ControlButton';

export interface IControlButtonProps {
    button: IControlButton;
    ModalComponent: React.ComponentType<any> & StyledComponentProps;
    IconComponent: React.FunctionComponent<any>;
    text: string;
}

function createControlButton(props: IControlButtonProps) {
    const { button, ModalComponent, IconComponent, text } = props;
    const useControlButton  = getHookControlButton(button);

    type Props = {
        isActive?: boolean;
        onAction?: () => void;
        doAction?: (callback: () => void) => void;
    } & WithStyles;

    function ControlButton({ classes, isActive, onAction, doAction }: Props) {
        const { 
            mode,  currentIsActive,
            onClick, setActive,
        } = useControlButton(onAction, doAction);

        useEffect(() => setActive(isActive), [setActive, isActive]);

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
                <ModalComponent button={button} />
            </Modal> : null
            }
        </>);
    }

    return withStyles(styles)(ControlButton);
}

export default createControlButton;
