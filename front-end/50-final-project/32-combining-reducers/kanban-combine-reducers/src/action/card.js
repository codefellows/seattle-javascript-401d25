import uuid from 'uuid/v4';

export const createAction = ({ content, sectionId }) => ({
  type: 'CARD_CREATE',
  payload: {
    content,
    sectionId,
    id: uuid(),
  },
});

export const updateAction = card => ({
  type: 'CARD_UPDATE',
  payload: card,
});

export const removeAction = card => ({
  type: 'CARD_REMOVE',
  payload: card,
});

