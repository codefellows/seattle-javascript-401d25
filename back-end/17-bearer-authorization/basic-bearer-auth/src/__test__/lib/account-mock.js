import faker from 'faker';
import Account from '../../model/account';

const createAccountMockPromise = () => {
  const mockData = {};
  const originalRequest = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };

  return Account.create(originalRequest.username, originalRequest.email, originalRequest.password)
    .then((account) => {
      mockData.originalRequest = originalRequest;
      mockData.account = account;
      return account.createTokenPromise(); // this line changes the token seed
    })
    .then((token) => {
      mockData.token = token;
      // if I make it here, I know the account info has changed and was resaved to the db due to the previous account.createTokenPromise that got invoked above. So now we must retrieve the account again to get the most updated information from it
      return Account.findById(mockData.account._id);
    })
    .then((account) => {
      // because this account is newly updated with a new token seed, I need to reassign it to the "account" property on my mockData object I declared above
      mockData.account = account;
      return mockData;
    });
};

const removeAccountMockPromise = () => Account.remove({});

export { createAccountMockPromise, removeAccountMockPromise };
