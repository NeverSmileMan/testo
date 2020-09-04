import React from 'react';

interface IModalService {
    showModal: (content: React.ReactElement | null) => void;
    onShowModal: (callback: () => void) => void;
    getContent: () => React.ReactElement | null;
}

class ModalService implements ModalService {
    private _content: React.ReactElement | null = null;
    private _callbackOnShowModal?: () => void;

    showModal(content: React.ReactElement | null) {
        this._content = content;
        this._onShowModal();
    }

    onShowModal(callback: () => void) {
        this._callbackOnShowModal = callback;
    }

    private _onShowModal() {
        if (this._callbackOnShowModal) this._callbackOnShowModal();
    }

    getContent() {
        return this._content;
    }
}

let instance: IModalService;

function getInstance() {
    if (!instance) {
        instance = new ModalService();
    }
    return instance;
}

export default { getInstance };
