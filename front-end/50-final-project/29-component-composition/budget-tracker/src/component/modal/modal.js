import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';


class Modal extends React.Component {
  render() {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <main className='modal-main'>
          <button onClick={this.props.handleClose}> close </button>
          {this.props.children}
        </main>
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
