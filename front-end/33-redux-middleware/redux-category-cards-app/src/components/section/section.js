import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionForm from '../section-form/section-form';
import * as sectionActions from '../../action/section';
// The import * basically means sectionActions looks like this:
// sectionActions = {
//   create: function
//   update:
//   remove:
// }

import CardForm from '../card-form/card-form';
import Card from '../card/card';
import * as cardActions from '../../action/card';


// The props that are passed into this Section component are DIFFERENT from the normal React way we've been passing in props. These props will actually be given to us by the Redux store

const mapStateToProps = store => ({
  cards: store.cards,
});


const mapDispatchToProps = (dispatch) => {
  // We are creating props from inside this component and these props are essentially internal
  return {
    cardCreate: data => dispatch(cardActions.createCard(data)),
    sectionRemove: data => dispatch(sectionActions.remove(data)), 
    // dispatch({ type: "SECTION_REMOVE": payload: {something}})
    sectionUpdate: data => dispatch(sectionActions.update(data)),
  };
};

class Section extends React.Component {
  render() {
    const {
      cards,
      cardCreate,
      section, 
      key,
      sectionRemove,
      sectionUpdate,
    } = this.props;

    const sectionCards = cards[section.id]; // this will be the array of cards associated with this particular section
    return (
      <div className="section" key={key} data-cy="section">
        <h1> { section.title } </h1>
        <button 
          onClick={() => sectionRemove(section)}
          data-cy="delete-btn"
        > 
          Delete 
        </button>
        <SectionForm section={section} onComplete={sectionUpdate}/>

        {/* new CardForm goes here */}
        <div className="card-form">
          <CardForm section={section} onComplete={cardCreate} />
          <div className="card-list">
            {
              sectionCards.map(card => <Card card={card} key={card.id} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  cards: PropTypes.object,
  cardCreate: PropTypes.func,
  section: PropTypes.object,
  key: PropTypes.number,
  sectionRemove: PropTypes.func,
  sectionUpdate: PropTypes.func,
};



// Redux's connect method takes in a first argument that we're not utilizing yet so it's null
// The second arg is the mapDispatchToProps function we defined above
// connect RETURNS a new function that expects a React component
// and this is how we hook up this component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Section);
