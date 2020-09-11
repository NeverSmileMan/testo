import createControlButton, { IControlButtonProps } from './ControlButton';

import Close from '../../data.structure/Close';
import CloseIcon from '@material-ui/icons/CheckCircle';
import CloseModal from './CloseModal';

import Print from '../../data.structure/Print';
import PrintIcon from '@material-ui/icons/Print';
import PrintModal from './PrintModal';

import Tara from '../../data.structure/Tara';
import TaraIcon from '@material-ui/icons/Speed';
import TaraModal from '../tara/TaraModal';

const propsClose: IControlButtonProps = {
    object: Close.getInstance(),
    ModalComponent: CloseModal,
    IconComponent: CloseIcon,
    text: 'закрити',
}

const propsPrint: IControlButtonProps = {
    object: Print.getInstance(),
    ModalComponent: PrintModal,
    IconComponent: PrintIcon,
    text: 'друк',
}

const propsTara: IControlButtonProps = {
    object: Tara.getInstance(),
    ModalComponent: TaraModal,
    IconComponent: TaraIcon,
    text: 'тара',
}

export default {
    CloseButton: createControlButton(propsClose),
    PrintButton: createControlButton(propsPrint),
    TaraButton: createControlButton(propsTara),
}
