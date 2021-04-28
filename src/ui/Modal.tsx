import ReactModal, { Props, Styles } from 'react-modal';

type ModalProps = Props;

const modalStyle: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: 8,
    padding: '40px 40px 40px 40px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--color-primary-800)',
    border: 'none',
    maxHeight: '80vh',
    width: '90%',
    maxWidth: 530,
  },
};

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <ReactModal
      style={modalStyle}
      shouldCloseOnEsc
      shouldFocusAfterRender
      {...props}>
      {children}
    </ReactModal>
  );
};

export { Modal };
