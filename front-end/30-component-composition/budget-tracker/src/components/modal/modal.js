import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default class Modal extends React.Component {
  render() {
    const showHiddenClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    
    return (
      <div className={showHiddenClassName} data-cy="modal">
        <main className="modal-main">
          <button onClick={this.props.handleClose} className="close-btn">X</button>
           {/* Anything listed as this.props.children is any random JSX we can plug in later when we instantiate this component elsewhere */}
          { this.props.children }
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
