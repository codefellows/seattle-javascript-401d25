import faker from 'faker';
import Profile from '../../model/profile';
import { createAccountMockPromise, removeAccountMockPromise } from './account-mock';

const createProfileMockPromise = () => {
  const mockData = {};

  return createAccountMockPromise()
    .then((mockAccountData) => {
      mockData.account = mockAccountData.account;
      console.log(mockData, 'what is here')
      
      const mockProfile = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        profileImageUrl: faker.random.image(),
        accountId: mockAccountData.account._id,
      };
      return new Profile(mockProfile).save();
    })
    .then((profile) => {
      mockData.profile = profile;
      return mockData;
    })
    .catch((err) => {
      throw err;
    });
};

const removeAllResources = () => {
  return Promise.all([
    Profile.remove({}),
    removeAccountMockPromise(),
  ]);
};

export { createProfileMockPromise, removeAllResources };

