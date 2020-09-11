import Close from '../../data.structure/Close';
import CloseIcon from '@material-ui/icons/CheckCircle';
import CloseModal from './CloseModal';
import createControlButton, { IControlButtonProps } from './ControlButton';

const close = Close.getInstance();

const props: IControlButtonProps = {
    object: close,
    onClickMethodName: 'doClose',
    modal: CloseModal,
    icon: CloseIcon,
    text: 'закрити',
}

const CloseButton = createControlButton(props);

export default CloseButton;
