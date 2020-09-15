import createControlButton, { IControlButtonProps } from './ControlButton';
import ControlButton from '../../data.structure/ControlButton';
import CloseIcon from '@material-ui/icons/CheckCircle';
import CloseModal from './CloseModal';
import PrintIcon from '@material-ui/icons/Print';
import PrintModal from './PrintModal';
import TaraButton from '../../data.structure/TaraButton';
import TaraIcon from '@material-ui/icons/Speed';
import TaraModal from '../tara/TaraModal';

const propsClose: IControlButtonProps = {
    object: new ControlButton(),
    ModalComponent: CloseModal,
    IconComponent: CloseIcon,
    text: 'закрити',
}

const propsPrint: IControlButtonProps = {
    object: new ControlButton(),
    ModalComponent: PrintModal,
    IconComponent: PrintIcon,
    text: 'друк',
}

const propsTara: IControlButtonProps = {
    object: new TaraButton(),
    ModalComponent: TaraModal,
    IconComponent: TaraIcon,
    text: 'тара',
}

export default {
    CloseButton: createControlButton(propsClose),
    PrintButton: createControlButton(propsPrint),
    TaraButton: createControlButton(propsTara),
}
