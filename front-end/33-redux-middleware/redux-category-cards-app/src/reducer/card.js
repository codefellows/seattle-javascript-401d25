const emptyState = {};

export default (state = emptyState, { type, payload }) => {
  let sectionId;
  let sectionCards;
  let updatedCards;
  let updatedState;

  switch (type) {
    // I have switch cases for SECTION in this card reducer because we need to change our state if someone wants to modify a section that has cards, (i.e. create or delete the section), we MUST do something to modify the cards state to keep our Redux store consistent. For example, if someone deletes a section, we must also delete the array of cards associated with that section
    case 'SECTION_CREATE': 
      return { ...state, [payload.id]: [] };
    case 'SECTION_REMOVE':
      updatedState = { ...state };
      // we delete the id property off this staet
      delete updatedState[payload.id];
      return updatedState;
    case 'CARD_CREATE': 
      sectionId = payload.sectionId; // eslint-disable-line
      sectionCards = state[sectionId];
      updatedCards = [ ...sectionCards, payload];
      return { ...state, [sectionId]: updatedCards };
    case 'CARD_UPDATE': 
      sectionId = payload.sectionId;
      sectionCards = state[sectionId];
      updatedCards = sectionCards.map(card => (card.id === payload.id ? payload : card));
      return { ...state, [sectionId]: updatedCards };
    case 'CARD_REMOVE':
      sectionId = payload.sectionId;
      sectionCards = state[sectionId];
      updatedCards = sectionCards.filter(card => card.id !== payload.id);
      return { ...state, [sectionId]: updatedCards };
    default: 
      return state;
  }
}

