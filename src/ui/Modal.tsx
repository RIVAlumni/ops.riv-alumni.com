/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import ReactModal, { Props, Styles } from 'react-modal';

const closeModalStyle = css`
  width: 1rem;
  height: 1rem;

  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: auto;
  right: 0;
  bottom: auto;

  cursor: pointer;
  padding: 20px;
`;

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

const Modal: React.FC<Props> = ({ children, ...props }) => {
  return (
    <ReactModal
      style={modalStyle}
      shouldCloseOnEsc
      shouldFocusAfterRender
      {...props}>
      <div className='w-100 d-flex flex-column'>
        <div css={closeModalStyle} onClick={(e) => props.onRequestClose?.(e)}>
          <i className='fas fa-times' />
        </div>
      </div>

      <div>{children}</div>
    </ReactModal>
  );
};

export { Modal };
