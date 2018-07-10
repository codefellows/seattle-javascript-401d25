import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardForm from './../card-form/card-form';
import * as cardActions from '../../action/card';

class Card extends React.Component {
  render() {
    const { card, cardRemove, cardUpdate } = this.props;
    console.log(this.props, 'CARD PROPS')
    return (
      <div className="card">
        <p> { card.content} </p>
        <button onClick={() => cardRemove(card)}>Delete</button>
        <CardForm 
          card={card}
          onComplete={cardUpdate}
        />
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object,
  cardRemove: PropTypes.func,
  cardUpdate: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  cardRemove: data => dispatch(cardActions.removeAction(data)),
  cardUpdate: data => dispatch(cardActions.updateAction(data)),
});

export default connect(null, mapDispatchToProps)(Card);
