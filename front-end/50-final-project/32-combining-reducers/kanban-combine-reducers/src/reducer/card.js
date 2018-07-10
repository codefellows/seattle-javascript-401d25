const emptyState = {};

export default (state = emptyState, { type, payload }) => {
  let sectionId;
  let sectionCards;
  let updatedCards;
  let updatedState;

  switch (type) {
    case 'SECTION_CREATE':
      return { ...state, [payload.id]: [] };
    case 'SECTION_REMOVE':
      updatedState = { ...state };
      delete updatedState[payload.id];
      return updatedState;
    case 'CARD_CREATE':
      sectionId = payload.sectionId; // eslint-disable-line
      sectionCards = state[sectionId];
      updatedCards = [...sectionCards, payload];
      return { ...state, [sectionId]: updatedCards };
    case 'CARD_UPDATE':
      sectionId = payload.sectionId; // eslint-disable-line
      sectionCards = state[sectionId];
      updatedCards = sectionCards.map(card => (card.id === payload.id ? payload : card));
      return { ...state, [sectionId]: updatedCards };
    case 'CARD_REMOVE':
      sectionId = payload.sectionId; // eslint-disable-line
      sectionCards = state[sectionId];
      updatedCards = sectionCards.filter(card => card.id !== payload.id);
      return { ...state, [sectionId]: updatedCards };
    default:
      return state;
  }
};
