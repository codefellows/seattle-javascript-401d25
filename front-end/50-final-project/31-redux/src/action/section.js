// Vinicio - We are creating a set of functions to simplify creating actions.
const create = ({ title }) => ({
  type: 'SECTION_CREATE',
  payload: {
    title,
    id: Math.random(),
    createdOn: new Date(),
  },
});

const update = section => ({
  type: 'SECTION_UPDATE',
  payload: section,
});

const remove = section => ({
  type: 'SECTION_REMOVE',
  payload: section,
});

export { create, update, remove };
