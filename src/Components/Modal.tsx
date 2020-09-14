import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
    modal: HTMLDivElement;
    modalRoot: HTMLElement | null;
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.modalRoot = document.getElementById('modal-root');
        this.modal = document.createElement('div');
        this.modal.id = 'modal';
    }

    componentDidMount() {
        this.modalRoot?.appendChild(this.modal);
    }

    componentWillUnmount() {
        this.modalRoot?.removeChild(this.modal);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.modal
        );
    }
}

export default Modal;
