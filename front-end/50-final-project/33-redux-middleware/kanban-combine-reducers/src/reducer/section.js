const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  // TODO : Validation
  switch (type) {
    case 'SECTION_CREATE':
      return [...state, payload];
    case 'SECTION_UPDATE':
      return state.map(section => (section.id === payload.id ? payload : section));
    case 'SECTION_REMOVE':
      return state.filter(section => section.id !== payload.id);
    default:
      return state;
  }
};
