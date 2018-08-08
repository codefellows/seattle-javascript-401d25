const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;

const API_LOGIN_KEY = '7bk6Q7De';
const API_TRANSACTION_KEY = '3M4yg53RX4qDYn8e';
const KEY = 'Simon';
const TAX_RATE = 0.09;
const TAX_STATE = 'Washington';

export default class AuthorizeNet {
  static process(data) {
    /*
      data ...

      { items:
        { '5b416ed405c29e30c7fb1c69':
            { _id: '5b416ed405c29e30c7fb1c69',
              name: 'tv',
              description: 'tv set',
              price: 100,
              category: 'foo',
              __v: 0
          },
          '5b416ee305c29e30c7fb1c6a':
            { _id: '5b416ee305c29e30c7fb1c6a',
              name: 'radio',
              description: 'transistor radio',
              price: 15,
              category: 'foo',
              __v: 0
            }
        },
        cc_number: '4242424242424242',
        cc_exp: '02/2021',
        customer_name: 'John Cokos',
        cc_cvv: '999',
        customer_address: '123 Main St',
        customer_city: 'Seattle',
        customer_state: 'WA',
        customer_zip: '98021'
      }
    */
    let merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(API_LOGIN_KEY);
    merchantAuthenticationType.setTransactionKey(API_TRANSACTION_KEY);

    let creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(data.cc_number);
    creditCard.setExpirationDate(data.cc_exp);
    creditCard.setCardCode(data.cc_cvv);

    let paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    let orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber(`INV-${Math.floor(new Date().getTime() / 1000)}`);
    orderDetails.setDescription('Order Summary');

    let taxAmount = 0;
    let subtotal = 0;
    let shippingCost = 0;
    let lineItemList = [];

    Object.keys(data.items).forEach((itemId) => {
      let lineItem = new ApiContracts.LineItemType();
      let item = data.items[itemId];
      lineItem.setItemId(itemId);
      lineItem.setName(item.name);
      lineItem.setDescription(item.description);
      lineItem.setQuantity(item.quantity || 1);
      lineItem.setUnitPrice(parseFloat(item.price));

      shippingCost = shippingCost + (item.shipping || 0) * parseInt(item.quantity || 1);
      console.log(subtotal, parseFloat(item.price), parseFloat(item.price) * parseInt(item.quantity || 1));
      subtotal = subtotal + parseFloat(item.price) * parseInt(item.quantity || 1);

      lineItemList.push(lineItem);
    });

    let lineItems = new ApiContracts.ArrayOfLineItem();
    lineItems.setLineItem(lineItemList);

    let tax = new ApiContracts.ExtendedAmountType();
    taxAmount = subtotal * TAX_RATE;
    tax.setAmount(taxAmount);
    tax.setName('Sales Tax');
    tax.setDescription(TAX_STATE);

    let shipping = new ApiContracts.ExtendedAmountType();
    shipping.setAmount(shippingCost);
    shipping.setName('Shipping Cost');

    let billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(data.customer_first_name);
    billTo.setLastName(data.customer_last_name);
    billTo.setCompany(data.customer_company);
    billTo.setAddress(data.customer_address);
    billTo.setCity(data.customer_city);
    billTo.setState(data.customer_state);
    billTo.setZip(data.customer_zip);
    billTo.setCountry('USA');
    console.log(data, billTo);

    let shipTo = new ApiContracts.CustomerAddressType();
    shipTo.setFirstName(data.shipping_first_name);
    shipTo.setLastName(data.shipping_last_name);
    shipTo.setCompany(data.shipping_company);
    shipTo.setAddress(data.shipping_address);
    shipTo.setCity(data.shipping_city);
    shipTo.setState(data.shipping_state);
    shipTo.setZip(data.shipping_zip);
    shipTo.setCountry(data.shipping_country);

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
    transactionRequestType.setAmount(subtotal + taxAmount + shippingCost);
    transactionRequestType.setLineItems(lineItems);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setTax(tax);
    transactionRequestType.setShipping(shipping);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);
    transactionRequestType.setTransactionSettings(transactionSettings);

    console.log('AMount', subtotal);
    let createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    return new Promise((resolve, reject) => {
      let ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
      ctrl.execute(function() {
        let apiResponse = ctrl.getResponse();
        let response = new ApiContracts.CreateTransactionResponse(apiResponse);
        if (response && response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
          resolve(response);
        }
        else {
          let error_message = '';
          if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
            error_message = response.getTransactionResponse().getErrors().getError()[0].getErrorText();
          }
          else {
            error_message = response.getMessages().getMessage()[0].getText();
          }
          console.log('ERR', error_message);
          reject(error_message);
        }
      });
    });
  }
}
