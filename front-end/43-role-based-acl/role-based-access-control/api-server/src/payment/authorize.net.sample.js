'use strict';

const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;

const API_LOGIN_KEY = '7bk6Q7De';
const API_TRANSACTION_KEY = '3M4yg53RX4qDYn8e';
const KEY = 'Simon';

export default class AuthorizeNet {
  process(data) {
    console.log('Processing', data);

    // this.authorizeCreditCard((success, response) => {
    //   console.log('authorizeCreditCard call complete.');
    //   console.log('success', success);
    //   console.log('request', JSON.stringify(createRequest.getJSON(), null, 2));
    //   console.log('response', response);
    // });
  }

  authorizeCreditCard(callback) {
    let merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(API_LOGIN_KEY);
    merchantAuthenticationType.setTransactionKey(API_TRANSACTION_KEY);

    let creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber('4242424242424242');
    creditCard.setExpirationDate('0822');
    creditCard.setCardCode('999');

    let paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    let orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber('INV-12345');
    orderDetails.setDescription('Product Description');

    let tax = new ApiContracts.ExtendedAmountType();
    tax.setAmount('4.26');
    tax.setName('level2 tax name');
    tax.setDescription('level2 tax');

    let duty = new ApiContracts.ExtendedAmountType();
    duty.setAmount('8.55');
    duty.setName('duty name');
    duty.setDescription('duty description');

    let shipping = new ApiContracts.ExtendedAmountType();
    shipping.setAmount('8.55');
    shipping.setName('shipping name');
    shipping.setDescription('shipping description');

    let billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName('Ellen');
    billTo.setLastName('Johnson');
    billTo.setCompany('Souveniropolis');
    billTo.setAddress('14 Main Street');
    billTo.setCity('Pecan Springs');
    billTo.setState('TX');
    billTo.setZip('44628');
    billTo.setCountry('USA');

    let shipTo = new ApiContracts.CustomerAddressType();
    shipTo.setFirstName('China');
    shipTo.setLastName('Bayles');
    shipTo.setCompany('Thyme for Tea');
    shipTo.setAddress('12 Main Street');
    shipTo.setCity('Pecan Springs');
    shipTo.setState('TX');
    shipTo.setZip('44628');
    shipTo.setCountry('USA');

    let lineItem_id1 = new ApiContracts.LineItemType();
    lineItem_id1.setItemId('1');
    lineItem_id1.setName('vase');
    lineItem_id1.setDescription('cannes logo');
    lineItem_id1.setQuantity('18');
    lineItem_id1.setUnitPrice(45.0);

    let lineItem_id2 = new ApiContracts.LineItemType();
    lineItem_id2.setItemId('2');
    lineItem_id2.setName('vase2');
    lineItem_id2.setDescription('cannes logo2');
    lineItem_id2.setQuantity('28');
    lineItem_id2.setUnitPrice('25.00');

    let lineItemList = [];
    lineItemList.push(lineItem_id1);
    lineItemList.push(lineItem_id2);

    let lineItems = new ApiContracts.ArrayOfLineItem();
    lineItems.setLineItem(lineItemList);

    let transactionSetting1 = new ApiContracts.SettingType();
    transactionSetting1.setSettingName('duplicateWindow');
    transactionSetting1.setSettingValue('120');

    let transactionSetting2 = new ApiContracts.SettingType();
    transactionSetting2.setSettingName('recurringBilling');
    transactionSetting2.setSettingValue('false');

    let transactionSettingList = [];
    transactionSettingList.push(transactionSetting1);
    transactionSettingList.push(transactionSetting2);

    let transactionSettings = new ApiContracts.ArrayOfSetting();
    transactionSettings.setSetting(transactionSettingList);

    let transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(859.25);
    transactionRequestType.setLineItems(lineItems);
    //transactionRequestType.setUserFields(userFields);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setTax(tax);
    transactionRequestType.setDuty(duty);
    transactionRequestType.setShipping(shipping);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);
    transactionRequestType.setTransactionSettings(transactionSettings);

    let createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    let ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

    ctrl.execute(function() {
      let success = false;
      let apiResponse = ctrl.getResponse();
      let response = new ApiContracts.CreateTransactionResponse(apiResponse);

      if (response != null) {
        if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
          success = true;
        }
      }

      callback(success, response);
    });
  }
}
