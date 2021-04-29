import ReactModal, { Props, Styles } from 'react-modal';

type ModalProps = Props;

const modalStyle: Styles = {
  overlay: {
    zIndex: 99999,
    background: 'transparent',
  },
  content: {
    color: 'white',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: 8,
    padding: '40px 40px 40px 40px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#151a21',
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
      <div className='w-100 d-flex flex-column'>
        <div
          className='d-flex justify-content-end position-absolute'
          style={{
            top: '20px',
            right: '20px',
          }}
          onClick={(e) => props.onRequestClose?.(e)}>
          <i className='fas fa-times' />
        </div>
      </div>
      {children}
    </ReactModal>
  );
};

export { Modal };
