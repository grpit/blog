import {
  FunctionComponent,
  ReactChild,
  useEffect,
  useState,
  MouseEvent
} from 'react';
import ReactDOM from 'react-dom';
import React from 'react';

interface IModalProps {
  isOpen: boolean;
  onClose: (event: MouseEvent) => void;
  showClose?: boolean;
  header?: ReactChild | null;
  footer?: ReactChild | null;
}

interface IModalHeaderProps {
  showClose?: boolean;
  onClose: (event: MouseEvent) => void;
}

const ModalBody: FunctionComponent = ({ children }) => {
  return (
    <div className='absolute left-0 top-0 bg-black bg-opacity-30 h-full w-full z-50'>
      <div className='mx-auto bg-white mt-40 max-w-2xl max-h-full rounded-md shadow-md py-3'>
        {children}
      </div>
    </div>
  );
};

const ModalHeader: FunctionComponent<IModalHeaderProps> = ({
  children,
  showClose = true,
  onClose
}) => {
  return (
    <div className='pb-2 border-b border-opacity-10 border-black px-4 flex justify-between'>
      <div className='text-primary text-lg font-semibold'>{children}</div>
      {showClose && (
        <div
          onClick={onClose}
          className='px-2 font-bold text-black items-center cursor-pointer'
        >
          x
        </div>
      )}
    </div>
  );
};

const ModalFooter: FunctionComponent = ({ children }) => {
  return (
    <div className='border-t border-black border-opacity-10 px-4 bottom-0 pt-2'>
      {children}
    </div>
  );
};

const Modal: FunctionComponent<IModalProps> = ({
  children,
  isOpen,
  showClose = false,
  onClose,
  header = null,
  footer = null
}) => {
  let [portalContainer, setContainer] = useState<any>();

  useEffect(() => {
    let container = document.getElementById('modal-container');
    setContainer(container);
  }, [isOpen]);

  if (portalContainer && isOpen)
    return ReactDOM.createPortal(
      <ModalBody>
        {header && (
          <ModalHeader showClose={showClose} onClose={onClose}>
            {header}
          </ModalHeader>
        )}
        <div
          className='px-4 py-3'
          style={{ minHeight: '200px', maxHeight: '60vh' }}
        >
          {children}
        </div>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalBody>,
      portalContainer
    );
  return null;
};

export default Modal;
