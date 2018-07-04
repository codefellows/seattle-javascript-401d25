import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise, removeAccountMockPromise } from './account-mock';
import Sound from '../../model/sound';
import Account from '../../model/account';

const createSoundMockPromise = async () => {
  const mockData = {};
  // mockAcctResponse will equal:
  /*
    {
      originalRequest: {},
      token: some token,
      account: { mongDb account}
    }
  */
  const mockAcctResponse = await createAccountMockPromise();
  // console.log(mockAcctResponse, 'inside async await');
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;
  const sound = await new Sound({
    title: faker.lorem.words(2),
    url: faker.random.image(),
    fileName: faker.system.fileName(),
    accountId: mockData.account._id,
  }).save();
  // console.log(sound, 'SOUND')
  mockData.sound = sound;
  return mockData;
};

const removeSoundsAndAccounts = () => {
  return Promise.all([
    Sound.remove({}),
    Account.remove({}),
  ]);
};


export { createSoundMockPromise, removeSoundsAndAccounts };
