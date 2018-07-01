'use strict';

import faker from 'faker';
import Classroom from '../../model/classroom';

export default () => {
  const mockResouceToPost = {
    name: faker.lorem.words(2),
    someOtherPropery: 'lalala',
  };
  return new Classroom(mockResouceToPost).save();
};
