import ReactModal, { Props, Styles } from 'react-modal';

type ModalProps = Props;

const modalStyle: Styles = {
  overlay: {
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    position: 'fixed',
    transform: 'translate(-50%, -50%)',

    width: '90%',
    maxWidth: '1024px',
    maxHeight: '80vh',

    padding: '40px',
    border: 'none',
    borderRadius: '8px',

    color: 'rgba(241, 242, 246, 1)',
    background: 'rgba(47, 53, 66, 1)',
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
          className='d-flex align-items-center justify-content-center position-absolute'
          style={{
            width: '1rem',
            height: '1rem',

            top: '0',
            left: 'auto',
            right: '0',
            bottom: 'auto',

            cursor: 'pointer',
            padding: '20px',
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
