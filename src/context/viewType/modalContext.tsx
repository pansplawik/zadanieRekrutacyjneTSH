import React, { useState, createContext, useContext, ReactNode, Dispatch } from 'react';

interface ModalContextProps {
  modal: boolean;
  handleButtonClick: (name, ds, img) => void;
  modalInfo: {
    name: string;
    description: string;
    image: string;
  };
  handleClose: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    name: '',
    description: '',
    image: '',
  });

  const handleButtonClick = (name, ds, img) => {
    setModal(!modal);

    setModalInfo((prevModalInfo) => ({
      ...prevModalInfo,
      name: name,
      description: ds,
      image: img,
    }));
  };

  const handleClose = () => {
    setModal(!modal);
  };

  const contextValue: ModalContextProps = {
    modal,
    handleButtonClick,
    modalInfo,
    handleClose,
  };
  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };
