'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactNative = require('react-native');
var React = require('react');
var React__default = _interopDefault(React);
var reactNativeWebview = require('react-native-webview');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Response = function () {
  function Response() {
    classCallCheck(this, Response);

    this.body = '';
    this.error = null;
  }

  createClass(Response, [{
    key: 'setBody',
    value: function setBody(body) {
      this.body = body;
    }
  }, {
    key: 'getBodyString',
    value: function getBodyString() {
      return this.body;
    }
  }, {
    key: 'getBodyJson',
    value: function getBodyJson() {
      return JSON.parse(this.body);
    }
  }, {
    key: 'setError',
    value: function setError(errorMessage, error) {
      this.error = {
        message: errorMessage,
        error: error
      };
    }
  }, {
    key: 'getError',
    value: function getError() {
      return this.error;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify({
        body: this.body,
        error: this.error
      });
    }
  }, {
    key: 'getSessionId',
    value: function getSessionId() {
      return this.getBodyJson().Data.SessionId;
    }
  }, {
    key: 'getCountryCode',
    value: function getCountryCode() {
      return this.getBodyJson().Data.CountryCode;
    }
  }, {
    key: 'getPaymentMethods',
    value: function getPaymentMethods() {
      return this.getBodyJson().Data.PaymentMethods;
    }
  }, {
    key: 'getInvoiceId',
    value: function getInvoiceId() {
      return this.getBodyJson().Data.InvoiceId;
    }
  }, {
    key: 'getPaymentURL',
    value: function getPaymentURL() {
      return this.getBodyJson().Data.PaymentURL;
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.getBodyJson().Data;
    }
  }, {
    key: 'errorMessage',
    value: function errorMessage(fromDirectPayment, fromExecute) {
      if (this.error) {
        return this.getError().error;
      }
      if (this.getBodyJson().IsSuccess) {
        if (!fromDirectPayment) {
          if (this.getBodyJson().Data.IsDirectPayment) {
            return 'For direct payment please call executeDirectPayment method';
          }
        }
        if (fromExecute) {
          if (this.getBodyJson().Data.PaymentURL === undefined) {
            return 'There is no payment URL';
          }
        }
        if (this.getBodyJson().Data.InvoiceTransactions !== undefined) {
          var message = '';
          this.getBodyJson().Data.InvoiceTransactions.forEach(function (element) {
            if (element.TransactionStatus == "Succss") {
              return '';
            } else if (element.TransactionStatus == "Failed") {
              message = element.Error;
            }
          });
          return message;
        }
        return '';
      }
      var message = this.getBodyJson().Message + '\n';
      if (this.getBodyJson().ValidationErrors !== null) {
        this.getBodyJson().ValidationErrors.forEach(function (element) {
          message = message + element.Name + ': ' + element.Error + '\n';
        });
      }
      return message;
    }
  }]);
  return Response;
}();

var MFSettings = function () {
  function MFSettings() {
    classCallCheck(this, MFSettings);
  }

  createClass(MFSettings, [{
    key: 'configure',
    value: function configure(baseURL, token) {
      this.environment = baseURL;
      if (baseURL.charAt(baseURL.length - 1) !== "/") {
        this.baseURL = baseURL + '/';
      } else {
        this.baseURL = baseURL;
      }
      this.token = token;
    }
  }, {
    key: 'getBaseURL',
    value: function getBaseURL() {
      return this.baseURL + 'v2/';
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      return this.token;
    }
  }, {
    key: 'setTheme',
    value: function setTheme(theme) {
      this.theme = theme;
    }
  }, {
    key: 'getTheme',
    value: function getTheme() {
      if (this.theme === undefined) {
        return new MFTheme('red', 'gray', 'Payment', 'Cancel');
      }
      return this.theme;
    }
  }, {
    key: 'getInvironment',
    value: function getInvironment() {
      return this.environment;
    }
  }]);
  return MFSettings;
}();

MFSettings.sharedInstance = MFSettings.sharedInstance == null ? new MFSettings() : MFSettings.sharedInstance;
function MFTheme(navigationTintColor, navigationBarTintColor, navigationTitle, cancelButtonTitle) {
  this.navigationTintColor = navigationTintColor;
  this.navigationBarTintColor = navigationBarTintColor;
  this.navigationTitle = navigationTitle;
  this.cancelButtonTitle = cancelButtonTitle;
}

var TypeCheck = function () {
  function TypeCheck() {
    classCallCheck(this, TypeCheck);
  }

  createClass(TypeCheck, null, [{
    key: 'isObject',
    value: function isObject(obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    }
  }, {
    key: 'isArray',
    value: function isArray(arr) {
      return Object.prototype.toString.call(arr) === '[object Array]';
    }
  }, {
    key: 'isString',
    value: function isString(str) {
      return Object.prototype.toString.call(str) === '[object String]';
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(value) {
      return value === undefined || value === null || value.trim() === '';
    }
  }, {
    key: 'isEmptyObject',
    value: function isEmptyObject(value) {
      return value === undefined || value === null;
    }
  }, {
    key: 'isValidUrl',
    value: function isValidUrl(url) {
      var regx = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
      return regx.test(url);
    }
  }]);
  return TypeCheck;
}();

var Request = function () {
  createClass(Request, null, [{
    key: 'TYPES',
    value: function TYPES() {
      return {
        'string': 1,
        'json': 2,
        'form': 3
      };
    }
  }]);

  function Request(url) {
    classCallCheck(this, Request);

    this.setUrl(url);
    this.headers = {};
  }

  createClass(Request, [{
    key: 'setUrl',
    value: function setUrl(url) {
      if (!TypeCheck.isString(url) || TypeCheck.isEmpty(url)) {
        throw new Error("Invalid url string");
      } else if (!TypeCheck.isValidUrl(url)) {
        throw new Error("Invalid url string");
      }
      this.url = url;
    }
  }, {
    key: 'getUrl',
    value: function getUrl() {
      return this.url;
    }
  }, {
    key: 'addHeader',
    value: function addHeader(key, value) {
      if (TypeCheck.isObject(key) || TypeCheck.isArray(key)) {
        throw new Error("Invalid header key type");
      }
      if (TypeCheck.isObject(value) || TypeCheck.isArray(value)) {
        throw new Error("Invalid header value type");
      }
      this.headers[key] = value;
    }
  }, {
    key: 'addHeaders',
    value: function addHeaders(headersObj) {
      if (!TypeCheck.isObject(headersObj)) {
        throw new Error("Invalid header object type");
      }
      for (var property in headersObj) {
        this.headers[property] = headersObj[property];
      }
    }
  }, {
    key: 'getHeaders',
    value: function getHeaders() {
      return this.headers;
    }
  }, {
    key: 'setStringData',
    value: function setStringData(stringData) {
      if (TypeCheck.isObject(stringData) || TypeCheck.isArray(stringData)) {
        throw new Error("Invalid string data");
      }
      this.stringData = stringData;
      this.type = Request.TYPES().string;
      this.data = stringData;
    }
  }, {
    key: 'getStringData',
    value: function getStringData() {
      return this.stringData;
    }
  }, {
    key: 'setFormData',
    value: function setFormData(fromData) {
      if (TypeCheck.isObject(fromData)) {
        this.fromData = fromData;
        this.type = Request.TYPES().form;
        this.data = Request.generateFormBody(this.formData);
      } else {
        throw new Error("Invalid form data params");
      }
    }
  }, {
    key: 'getFormData',
    value: function getFormData() {
      return this.fromData;
    }
  }, {
    key: 'setJsonData',
    value: function setJsonData(jsonData) {
      if (TypeCheck.isObject(jsonData) || TypeCheck.isArray(jsonData)) {
        this.jsonData = jsonData;
        this.type = Request.TYPES().json;
        this.data = JSON.stringify(this.jsonData);
      } else {
        throw new Error("Invalid json data");
      }
    }
  }, {
    key: 'getJsonData',
    value: function getJsonData() {
      return this.jsonData;
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.data;
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }, {
    key: 'setQueryParams',
    value: function setQueryParams(queryParams) {
      if (TypeCheck.isObject(queryParams)) {
        this.queryParamsMap = queryParams;
        this.queryParams = "?" + Request.generateFormBody(queryParams);
      } else {
        throw new Error("Invalid query params");
      }
    }
  }, {
    key: 'getQueryParams',
    value: function getQueryParams() {
      return this.queryParams;
    }
  }, {
    key: 'getQueryParamsMap',
    value: function getQueryParamsMap() {
      return this.queryParamsMap;
    }
  }], [{
    key: 'generateFormBody',
    value: function generateFormBody(requestObj) {
      var formBody = [];
      for (var property in requestObj) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(requestObj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      return formBody;
    }
  }]);
  return Request;
}();

var LOGGER = function () {
  function LOGGER() {
    classCallCheck(this, LOGGER);
  }

  createClass(LOGGER, null, [{
    key: 'log',
    value: function log(message, error) {
      if (RNETWORK.DEBUG_ENABLED == true) {
        if (error) {
          console.log(message, error);
        } else {
          console.log(message);
        }
      }
    }
  }]);
  return LOGGER;
}();

var RNETWORK = function () {
  function RNETWORK() {
    classCallCheck(this, RNETWORK);
  }

  createClass(RNETWORK, null, [{
    key: 'get',
    value: function get$$1(request, preExecuteCallback, postExecuteCallback) {
      if (preExecuteCallback) {
        preExecuteCallback();
      }
      var url = request.getUrl();
      if (!TypeCheck.isEmpty(request.getQueryParams())) {
        url = url + request.getQueryParams();
      }
      var response = new Response();
      try {
        fetch(url, {
          method: 'GET',
          headers: request.getHeaders()
        }).then(function (apiResponse) {
          LOGGER.log("URL----" + url + "/n Response----" + JSON.stringify(apiResponse));
          response.setStatus(apiResponse.status);
          response.setHeaders(apiResponse.headers.map);
          response.setUrl(apiResponse.url);
          response.setBody(apiResponse._bodyText);
          postExecuteCallback(response);
        }).catch(function (error) {
          LOGGER.log("Error", error);
          response.setError("Network Connection Failed", error);
          postExecuteCallback(response);
        });
      } catch (error) {
        LOGGER.log("Error", error);
        response.setError("Request Failed. Please check the request details.", error);
        postExecuteCallback(response);
      }
    }
  }, {
    key: 'post',
    value: function post(request, preExecuteCallback, postExecuteCallback) {
      if (preExecuteCallback) {
        preExecuteCallback();
      }
      var url = request.getUrl();
      if (!TypeCheck.isEmpty(request.getQueryParams())) {
        url = url + request.getQueryParams();
      }
      var response = new Response();
      try {
        fetch(url, {
          method: 'POST',
          headers: request.getHeaders(),
          body: request.getData()
        }).then(function (response) {
          return response.text();
        }).then(function (apiResponse) {
          LOGGER.log("URL----" + url + "/n Response----" + JSON.stringify(apiResponse));
          response.setBody(apiResponse);
          // response.setBody(JSON.stringify(apiResponse));
          postExecuteCallback(response);
        }).catch(function (error) {
          LOGGER.log("Error", error);
          response.setError("Network Connection Failed", error);
          postExecuteCallback(response);
        });
      } catch (error) {
        LOGGER.log("Error", error);
        response.setError("Request Failed. Please check the request details.", error);
        postExecuteCallback(response);
      }
    }
  }]);
  return RNETWORK;
}();

RNETWORK.DEBUG_ENABLED = false;

function MFPaymentStatusRequest$$1(key, keyType) {
  this.key = key;
  this.keyType = keyType;
}

function MFInitiatePayment$$1(invoiceAmount, currencyIso) {
  this.invoiceAmount = invoiceAmount;
  this.currencyIso = currencyIso;
}
function MFExecutePaymentRequest$$1(invoiceValue, paymentMethod, callBackUrl, errorUrl) {
  this.invoiceValue = invoiceValue;
  if (paymentMethod === undefined) {
    this.paymentMethod = '';
  } else {
    this.paymentMethod = paymentMethod;
  }
  if (callBackUrl === undefined) {
    this.callBackUrl = exports.CALLBACK_URL;
  } else {
    this.callBackUrl = callBackUrl;
  }
  if (errorUrl === undefined) {
    this.errorUrl = exports.ERROR_URL;
  } else {
    this.errorUrl = errorUrl;
  }

  this.customerName = '';
  this.customerCivilId = '';
  this.customerReference = '';
  this.customerEmail = '';
  this.customerMobile = '';
  this.invoiceItems = [];
  this.language = 'en';
  this.expiryDate = null;
  this.customerAddress = new MFCustomerAddress$$1('', '', '', '', '');
  this.userDefinedField = '';
  this.displayCurrencyIso = '';
  this.mobileCountryCode = '';
  this.supplierCode = 0;
  this.supplierValue = 0;
  this.suppliers = [];
  this.sessionId = '';
}

function MFProduct$$1(name, unitPrice, quantity) {
  this.name = name;
  this.unitPrice = unitPrice;
  this.quantity = quantity;
}

function MFSupplier$$1(supplierCode, proposedShare, invoiceShare) {
  this.supplierCode = supplierCode;
  this.proposedShare = proposedShare;
  this.invoiceShare = invoiceShare;
}

function MFCustomerAddress$$1(block, street, houseBuildingNo, address, addressInstructions) {
  this.block = block;
  this.street = street;
  this.houseBuildingNo = houseBuildingNo;
  this.address = address;
  this.addressInstructions = addressInstructions;
}

function MFCardInfo$$1(cardNumber, cardExpiryMonth, cardExpiryYear, cardSecurityCode, cardHolderName, paymentType, saveToken) {
  this.paymentType = paymentType;
  this.card = new MFCard(cardNumber, cardExpiryMonth, cardExpiryYear, cardSecurityCode, cardHolderName);
  this.saveToken = saveToken;
  this.bypass = true;
}

function MFCard(number, expiryMonth, expiryYear, securityCode, cardHolderName) {
  this.number = number;
  this.expiryMonth = expiryMonth;
  this.expiryYear = expiryYear;
  this.securityCode = securityCode;
  this.cardHolderName = cardHolderName;
}

function MFSendPaymentRequest$$1(invoiceValue, notificationOption, customerName) {
  this.invoiceValue = invoiceValue;
  this.customerName = customerName;
  this.notificationOption = notificationOption;
  this.mobileCountryIsoCode = '+965';
  this.displayCurrencyIso = 'KWD';
  this.customerCivilId = '';
  this.customerReference = '';
  this.customerEmail = '';
  this.customerMobile = '';
  this.invoiceItems = [];
  this.language = 'en';
  this.expiryDate = null;
  this.errorUrl = '';
  this.customerAddress = new MFCustomerAddress$$1('', '', '', '', '');
  this.callBackUrl = '';
  this.userDefinedField = '';
  this.supplierCode = 0;
  this.supplierValue = 0;
}

var MFLanguage = Object.freeze({
  ARABIC: 'ar',
  ENGLISH: 'en'
});

var MFNotificationOption = Object.freeze({
  ALL: 'all',
  EMAIL: 'eml',
  SMS: 'sms',
  LINK: 'lnk'
});

var MFPaymentype = Object.freeze({
  CARD: 'card',
  TOKEN: 'token'
});

var MFMobileCountryCodeISO = Object.freeze({
  KUWAIT: '+965',
  SAUDIARABIA: '+966',
  BAHRAIN: '+973',
  UAE: '+971',
  QATAR: '+974',
  OMAN: '+968',
  JORDAN: '+962'
});

var MFCurrencyISO = Object.freeze({
  KUWAIT_KWD: 'KWD',
  SAUDIARABIA_SAR: 'SAR',
  BAHRAIN_BHD: 'BHD',
  UAE_AED: 'AED',
  QATAR_QAR: 'QAR',
  OMAN_MOR: 'OMR',
  JORDAN_JOD: 'JOD',
  UNITEDSTATES_USD: 'USD',
  EURO_EUR: 'EUR'
});

var MFKeyType = Object.freeze({
  INVOICEID: 'InvoiceId',
  PAYMENTID: 'PaymentId'
});

var MFPaymentMethodCode = Object.freeze({
  AMEX: "ae",
  SADAD: "s",
  BENEFIT: "b",
  UAEDEBITCARDS: "uaecc",
  QATARDEBITCARDS: "np",
  MADA: "md",
  KFAST: "kf",
  KNET: "kn",
  APPLEPAY: "ap",
  AFS: "af",
  VISAMASTER: "vm",
  STCPAY: "stc"
});
var MFEnvironment = Object.freeze({
  TEST: 'https://apitest.myfatoorah.com',
  LIVE: 'https://api.myfatoorah.com'
});

/**
 * @class
 * @classdesc A handle payment requests.
 */

var MFPaymentRequest = function () {
  function MFPaymentRequest() {
    classCallCheck(this, MFPaymentRequest);
  }

  createClass(MFPaymentRequest, [{
    key: 'initiatePayment',


    /**
     * Retrieves all payment methods available for the user token.
     * @param  {MFInitiatePayment} request - initiate payment object.
     * @param  {string} apiLanguage - API language.
     * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
     */
    value: function initiatePayment(request, apiLanguage, postExecuteCallback) {
      var jsonData = {
        'InvoiceAmount': request.invoiceAmount,
        'CurrencyIso': request.currencyIso
      };
      issueRequest(jsonData, 'InitiatePayment', apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(false, false);
        if (errorMessage.length !== 0) {
          response.setError("Error Message", errorMessage);
          postExecuteCallback(response);
        } else {
          if (reactNative.Platform.OS === 'ios') {
            postExecuteCallback(response);
          } else {
            if (response.getPaymentMethods() !== null) {
              var data = { PaymentMethods: [] };
              response.getPaymentMethods().forEach(function (element) {
                if (element.PaymentMethodCode !== MFPaymentMethodCode.APPLEPAY) {
                  data.PaymentMethods.push(element);
                }
              });
              var dataString = JSON.stringify(data);
              var body = '{"IsSuccess":' + response.getBodyJson().IsSuccess + ',"Message":"' + response.getBodyJson().Message + '","ValidationErrors":' + response.getBodyJson().ValidationErrors + ',"Data":' + dataString + '}';
              var response2 = new Response();
              response2.setBody(body);
              postExecuteCallback(response2);
            } else {
              postExecuteCallback(response);
            }
          }
        }
      });
    }

    /**
    * Initiate session id.
    * @param  {string} apiLanguage - API language.
    * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
    */

    /**
     * A `MFPaymentRequest` access all MFPaymentRequest methods with same object. 
     * @type {MFPaymentRequest}
     */

  }, {
    key: 'initiateSession',
    value: function initiateSession(apiLanguage, postExecuteCallback) {
      issueRequest(undefined, 'InitiateSession', apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(false, false);
        if (errorMessage.length !== 0) {
          response.setError("Error Message", errorMessage);
          postExecuteCallback(response);
        } else {
          postExecuteCallback(response);
        }
      });
    }

    /**
     * execute normal payment.
     * 
     * @param  navigation - to navigate between payment and app screens.
     * @param  {MFExecutePaymentRequest} request - execute payment request object.
     * @param  {string} apiLanguage - API language.
     * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
     */

  }, {
    key: 'executePayment',
    value: function executePayment(navigation, request, apiLanguage, postExecuteCallback) {

      var jsonData = executePaymentJson(request);

      issueRequest(jsonData, 'ExecutePayment', apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(false, true);
        if (errorMessage.length !== 0) {
          response.setError("Error Message", errorMessage);
          postExecuteCallback(response);
        } else {
          var url = response.getPaymentURL();
          navigation.navigate('MFWebView', { link: url, apiLanguage: apiLanguage, postExecuteCallback: postExecuteCallback });
        }
      });
    }
    /**
     * get payment status by invoice id or payment id.
     * @param  {MFPaymentStatusRequest} paymentStatus - payment status request object.
     * @param  {string} apiLanguage - API language.
     * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
     */

  }, {
    key: 'getPaymentStatus',
    value: function getPaymentStatus(paymentStatus, apiLanguage, postExecuteCallback) {
      var jsonData = {
        'Key': paymentStatus.key,
        'KeyType': paymentStatus.keyType
      };

      issueRequest(jsonData, "GetPaymentStatus", apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(false, false);
        if (errorMessage.length !== 0) {
          response.setError("Error Message", errorMessage);
          postExecuteCallback(response);
        } else {
          postExecuteCallback(response);
        }
      });
    }

    /**
     * execute recurring payment.
     * @param  {Navigation} navigation - to navigate between payment and app screens.
     * @param  {MFExecutePaymentRequest} request - exeute payment request object.
     * @param  {MFCardInfo} cardInfo - card information object
     * @param  {Int} intervalDays - interval days for recurring
     * @param  {string} apiLanguage - API language.
     * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
     */

  }, {
    key: 'executeRecurringPayment',
    value: function executeRecurringPayment(navigation, request, cardInfo, intervalDays, apiLanguage, postExecuteCallback) {
      var jsonData = executePaymentJson(request);
      issueRequest(jsonData, 'ExecutePayment', apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(true, true);
        if (errorMessage.length !== 0) {
          response.setError('Error Message', errorMessage);
          postExecuteCallback(response);
        } else {
          parse(response, apiLanguage, postExecuteCallback, navigation, cardInfo, intervalDays);
        }
      });
    }

    /**
     * execute direct payment.
     * @param  {Navigation} navigation - to navigate between payment and app screens.
     * @param  {MFExecutePaymentRequest} request - exeute payment request object.
     * @param  {MFCardInfo} cardInfo - card information object
     * @param  {string} apiLanguage - API language.
     * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
     */

  }, {
    key: 'executeDirectPayment',
    value: function executeDirectPayment(navigation, request, cardInfo, apiLanguage, postExecuteCallback) {
      var jsonData = executePaymentJson(request);
      issueRequest(jsonData, 'ExecutePayment', apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(true, true);
        if (errorMessage.length !== 0) {
          response.setError('Error Message', errorMessage);
          postExecuteCallback(response);
        } else {
          parse(response, apiLanguage, postExecuteCallback, navigation, cardInfo, undefined);
        }
      });
    }

    /**
     * cancel recurring payment.
     * @param  {String} recurringId - recurring id to cancel.
     * @param  {string} apiLanguage - API language.
     * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
     */

  }, {
    key: 'cancelRecurringPayment',
    value: function cancelRecurringPayment(recurringId, apiLanguage, postExecuteCallback) {
      var encodedRecurringId = encodeURIComponent(recurringId);
      issueRequest(undefined, 'CancelRecurringPayment?recurringId=' + encodedRecurringId, apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(false, false);
        if (errorMessage.length !== 0) {
          response.setError('Error Message', errorMessage);
          postExecuteCallback(response);
        } else {
          postExecuteCallback(response);
        }
      });
    }

    /**
     * to create payment link and send it by link, sms, email, or all.
     * @param  {MFSendPaymentRequest} request - send payment request object.
     * @param  {string} apiLanguage - callback to handle response.
     * @param  {postExecuteCallback} postExecuteCallback - callback to handle response.
     */

  }, {
    key: 'sendPayment',
    value: function sendPayment(request, apiLanguage, postExecuteCallback) {
      var jsonData = sendPaymentJson(request);

      issueRequest(jsonData, 'SendPayment', apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(false, false);
        if (errorMessage.length !== 0) {
          response.setError("Error Message", errorMessage);
          postExecuteCallback(response);
        } else {
          postExecuteCallback(response);
        }
      });
    }
  }]);
  return MFPaymentRequest;
}();

MFPaymentRequest.sharedInstance = MFPaymentRequest.sharedInstance == null ? new MFPaymentRequest() : MFPaymentRequest.sharedInstance;

//region REQUEST HANDLE METHODS
function executePaymentJson(request) {
  if (request.callBackUrl.length !== 0) {
    exports.CALLBACK_URL = request.callBackUrl;
  }
  if (request.errorUrl.length !== 0) {
    exports.ERROR_URL = request.errorUrl;
  }

  var callerType = 'android';
  var callerOS = 'android';
  if (reactNative.Platform.OS === 'ios') {
    callerOS = 'ios';
    if (reactNative.Platform.isPad) {
      callerType = 'ipad';
    } else {
      callerType = 'phone';
    }
  }
  var sourceInfo = callerType + '-' + callerOS + '-' + reactNative.Platform.Version + '-react_native-0.0.181';
  var jsonData = {
    "InvoiceValue": request.invoiceValue,
    "CallBackUrl": exports.CALLBACK_URL,
    "ErrorUrl": exports.ERROR_URL,
    "DisplayCurrencyIso": request.displayCurrencyIso,
    "MobileCountryCode": request.mobileCountryCode,
    "UserDefinedField": request.userDefinedField,
    "CustomerName": request.customerName,
    "CustomerCivilId": request.customerCivilId,
    "CustomerReference": request.customerReference,
    "CustomerMobile": request.customerMobile,
    "CustomerEmail": request.customerEmail,
    "Language": request.language,
    "SupplierCode": request.supplierCode,
    "SupplierValue": request.supplierValue,
    "SourceInfo": sourceInfo
  };
  if (request.paymentMethod === '') {
    jsonData.SessionId = request.sessionId;
  } else {
    jsonData.PaymentMethodId = request.paymentMethod;
  }
  if (request.expiryDate !== null) {
    jsonData.ExpiryDate = request.expiryDate.toISOString();
  }
  var invoiceItems = [];
  for (var i in request.invoiceItems) {
    var product = request.invoiceItems[i];
    invoiceItems.push({
      "ItemName": product.name,
      "Quantity": product.quantity,
      "UnitPrice": product.unitPrice
    });
  }
  var suppliers = [];
  for (var i in request.suppliers) {
    var supplier = request.suppliers[i];
    suppliers.push({
      "SupplierCode": supplier.supplierCode,
      "ProposedShare": supplier.proposedShare,
      "InvoiceShare": supplier.invoiceShare
    });
  }
  if (invoiceItems.length !== 0) {
    jsonData.InvoiceItems = invoiceItems;
  }

  if (suppliers.length !== 0) {
    jsonData.Suppliers = suppliers;
  }
  var customerAddress = request.customerAddress;
  var customerAddressData = {
    "Block": customerAddress.block,
    "Street": customerAddress.street,
    "HouseBuildingNo": customerAddress.houseBuildingNo,
    "Address": customerAddress.address,
    "AddressInstructions": customerAddress.addressInstructions
  };
  jsonData.CustomerAddress = customerAddressData;
  return jsonData;
}
function sendPaymentJson(request) {
  if (request.callBackUrl.length !== 0) {
    exports.CALLBACK_URL = request.callBackUrl;
  }
  if (request.errorUrl.length !== 0) {
    exports.ERROR_URL = request.errorUrl;
  }
  var jsonData = {
    "InvoiceValue": request.invoiceValue,
    "NotificationOption": request.notificationOption,
    "CallBackUrl": exports.CALLBACK_URL,
    "ErrorUrl": exports.ERROR_URL,
    "DisplayCurrencyIso": request.displayCurrencyIso,
    "MobileCountryCode": request.mobileCountryCode,
    "UserDefinedField": request.userDefinedField,
    "CustomerName": request.customerName,
    "CustomerCivilId": request.customerCivilId,
    "CustomerReference": request.customerReference,
    "CustomerMobile": request.customerMobile,
    "CustomerEmail": request.customerEmail,
    "Language": request.language,
    "SupplierCode": request.supplierCode,
    "SupplierValue": request.supplierValue
  };
  if (request.expiryDate !== null) {
    jsonData.ExpiryDate = request.expiryDate.toISOString();
  }
  var invoiceItems = [];
  for (var i in request.invoiceItems) {
    var product = request.invoiceItems[i];
    invoiceItems.push({
      "ItemName": product.name,
      "Quantity": product.quantity,
      "UnitPrice": product.unitPrice
    });
    if (invoiceItems.length !== 0) {
      jsonData.InvoiceItems = invoiceItems;
    }
    var customerAddress = request.customerAddress;
    var customerAddressData = {
      "Block": customerAddress.block,
      "Street": customerAddress.street,
      "HouseBuildingNo": customerAddress.houseBuildingNo,
      "Address": customerAddress.address,
      "AddressInstructions": customerAddress.addressInstructions
    };
    jsonData.CustomerAddress = customerAddressData;
  }
  return jsonData;
}
function cardInfoJson(cardInfo, intervalDays) {

  if (cardInfo.card !== undefined) {
    var card = cardInfo.card;
    var cardParameters = {
      "CardHolderName": card.cardHolderName,
      "Number": card.number,
      "ExpiryMonth": card.expiryMonth,
      "ExpiryYear": card.expiryYear,
      "SecurityCode": card.securityCode
    };
    var jsonData = {
      "PaymentType": cardInfo.paymentType,
      "Card": cardParameters,
      "SaveToken": cardInfo.saveToken || false,
      "Bypass3DS": cardInfo.bypass
    };
    if (intervalDays !== undefined) {
      jsonData.IntervalDays = intervalDays;
      jsonData.IsRecurring = true;
    }
    return jsonData;
  }
  return {
    "PaymentType": cardInfo.paymentType,
    "Token": cardInfo.cardToken || ''
  };
}
//endregion

//region NETOWRK HANDLE METHOD
function issueRequest(jsonData, methodName, apiLanguage, withFullPath, postExecuteCallback) {
  var path = MFSettings.sharedInstance.getBaseURL() + methodName;
  if (withFullPath) {
    path = methodName;
  }
  var newRequest = new Request(path);
  newRequest.addHeader('Content-Type', 'application/json');
  newRequest.addHeader('Authorization', 'Bearer ' + MFSettings.sharedInstance.getToken());
  newRequest.addHeader('Accept-Language', apiLanguage);
  if (jsonData !== undefined) {
    newRequest.setJsonData(jsonData);
  }

  RNETWORK.post(newRequest, function () { }, function (response) {
    postExecuteCallback(response);
  });
}
//endregion

//region PAYMENT HANDLE METHODS
function parseDirectPaymentResponse(cardInfoResponse, response, postExecuteCallback) {
  if (cardInfoResponse === undefined) {
    var responseError = new Response();
    responseError.setError('Error Message', '' + response.getBodyJson().Data.InvoiceId);
    postExecuteCallback(responseError);
  } else {
    var data = response.getBodyJson().Data;
    if (data !== undefined) {
      var directPaymentResponse = new Response();
      var directPaymentJson = {
        getPaymentStatusResponse: data,
        cardInfoResponse: cardInfoResponse
      };
      directPaymentResponse.setBody(JSON.stringify(directPaymentJson));
      postExecuteCallback(directPaymentResponse);
    } else {
      var responseError = new Response();
      responseError.setError('Error Message', 'No payment status response');
      postExecuteCallback(responseError);
    }
  }
}
function parse(response, apiLanguage, postExecuteCallback, navigation, cardInfo, intervalDays) {
  if (response.getBodyJson().Data.IsDirectPayment) {
    if (response.getPaymentURL() !== undefined) {
      var jsonData = cardInfoJson(cardInfo, intervalDays);
      var method = response.getPaymentURL();
      issueRequest(jsonData, method, apiLanguage, true, function (response) {
        var errorMessage = response.errorMessage(false, false);
        if (errorMessage.length !== 0) {
          response.setError('Error Message', errorMessage);
          postExecuteCallback(response);
        } else {
          handleDirectPayment(response, navigation, cardInfo, apiLanguage, postExecuteCallback);
        }
      });
    } else {
      var responseError = new Response();
      responseError.setError('Error Message', 'There is no direct payment URL');
      postExecuteCallback(responseError);
    }
  } else {
    var responseError = new Response();
    responseError.setError('Error Message', 'Direct payment is not available for this account, please call executePayment method');
    postExecuteCallback(responseError);
  }
}
function handleDirectPayment(response, navigation, cardInfo, apiLanguage, postExecuteCallback) {
  if (!cardInfo.bypass) {
    var cardInfoResponse = response.getBodyJson().Data;
    var url = cardInfoResponse.PaymentURL;
    navigation.navigate('MFWebView', { link: url, apiLanguage: apiLanguage, cardInfoResponse: cardInfoResponse, postExecuteCallback: postExecuteCallback });
  } else {
    var cardInfoResponse = response.getBodyJson().Data;
    var paymentID = cardInfoResponse.PaymentId;
    var paymentStatusRequest = new MFPaymentStatusRequest$$1(paymentID, MFKeyType.PAYMENTID);
    MFPaymentRequest.sharedInstance.getPaymentStatus(paymentStatusRequest, apiLanguage, function (response) {
      var errorMessage = response.errorMessage(false, false);
      if (errorMessage.length !== 0) {
        response.setError('Error Message', errorMessage);
        postExecuteCallback(response);
      } else {
        parseDirectPaymentResponse(cardInfoResponse, response, postExecuteCallback);
      }
    });
  }
}
//endregion
exports.CALLBACK_URL = 'https://myfatoorah.com/';
exports.ERROR_URL = 'https://myfatooraherror.com/';

reactNative.YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

var MFWebView$$1 = function (_Component) {
  inherits(MFWebView$$1, _Component);

  function MFWebView$$1(props) {
    classCallCheck(this, MFWebView$$1);

    var _this = possibleConstructorReturn(this, (MFWebView$$1.__proto__ || Object.getPrototypeOf(MFWebView$$1)).call(this, props));

    // to solve twice back behaviour on Android 
    _this.didBack = false;

    _this.onNavigationStateChange = function (navigationState) {
      var url = navigationState.url;

      var route = _this.props.route;
      var navigation = _this.props.navigation;
      var apiLanguage = route.params.apiLanguage;
      var postExecuteCallback = route.params.postExecuteCallback;
      var cardInfoResponse = route.params.cardInfoResponse;


      if (url.includes(exports.CALLBACK_URL) || url.includes(exports.ERROR_URL)) {
        if (url.includes('paymentId')) {
          issueRequest(undefined, url, apiLanguage, true, function (response) {
            // var errorMessage = response.errorMessage(false, false);
            // alert("Execute callback: " + url + ", response: " + response.getBodyString())
          });
          var paymentId = _this.parseURLParams('paymentId', url);
          var paymentStatusRequest = new MFPaymentStatusRequest$$1(paymentId, "PaymentId");
          MFPaymentRequest.sharedInstance.getPaymentStatus(paymentStatusRequest, apiLanguage, function (response) {
            var errorMessage = response.errorMessage(false, false);
            if (errorMessage.length !== 0) {
              response.setError('Error Message', errorMessage);
              postExecuteCallback(response);
            } else {
              if (cardInfoResponse !== undefined) {
                var directPaymentResponse = new Response();
                var directPaymentJson = {
                  getPaymentStatusResponse: response.getBodyJson().Data,
                  cardInfoResponse: cardInfoResponse
                };
                directPaymentResponse.setBody(JSON.stringify(directPaymentJson));
                postExecuteCallback(directPaymentResponse);
              } else {
                postExecuteCallback(response);
              }
            }
            if (!_this.didBack) {
              _this.didBack = true;
              navigation.goBack();
            }
          });
        }
      }
    };

    return _this;
  }

  createClass(MFWebView$$1, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.myWebView.reload();
    }

    //region HELPERS METHODS

  }, {
    key: 'LoadingIndicatorView',
    value: function LoadingIndicatorView() {
      return React__default.createElement(reactNative.ActivityIndicator, { color: MFSettings.sharedInstance.getTheme().navigationTintColor, size: 'large', style: styles.ActivityIndicatorStyle });
    }
  }, {
    key: 'parseURLParams',
    value: function parseURLParams(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    //endregion

    //region CALLBACKS

    //endregion

    //region navigationOptions

  }, {
    key: 'render',

    //endregion


    value: function render() {
      var _this2 = this;

      var route = this.props.route;
      var link = route.params.link;


      return React__default.createElement(reactNativeWebview.WebView, {
        source: { uri: link },
        renderLoading: this.LoadingIndicatorView,
        startInLoadingState: true,
        ref: function ref(_ref) {
          return _this2.myWebView = _ref;
        },
        onNavigationStateChange: this.onNavigationStateChange
      });
    }
  }]);
  return MFWebView$$1;
}(React.Component);

MFWebView$$1.navigationOptions = function (_ref2) {
  var navigation = _ref2.navigation,
    route = _ref2.route;

  return {
    gestureEnabled: false,
    title: MFSettings.sharedInstance.getTheme().navigationTitle,
    headerStyle: {
      backgroundColor: MFSettings.sharedInstance.getTheme().navigationBarTintColor
    },
    headerTintColor: MFSettings.sharedInstance.getTheme().navigationTintColor,
    headerRight: function headerRight() {
      return React__default.createElement(
        reactNative.TouchableOpacity,
        {
          onPress: function onPress() {
            return navigation.setParams({ refresh: 1 });
          }
        },
        React__default.createElement(reactNative.Image, { style: [styles.ImageClass, { tintColor: MFSettings.sharedInstance.getTheme().navigationTintColor }], source: require('./assets/refresh.png') })
      );
    },
    headerLeft: function headerLeft() {
      return React__default.createElement(reactNative.Button, {
        onPress: function onPress() {
          var postExecuteCallback = route.params.postExecuteCallback;

          var response = new Response();
          response.setError('Error Message', 'User clicked cancel button');
          postExecuteCallback(response);
          navigation.goBack();
        },
        title: MFSettings.sharedInstance.getTheme().cancelButtonTitle,
        color: MFSettings.sharedInstance.getTheme().navigationTintColor
      });
    }
  };
};


var styles = reactNative.StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    top: 0, right: 0, left: 0, bottom: 0,
    position: 'absolute'
  },
  ImageClass: {
    // Setting up image width.
    width: 25,

    // Setting up image height.
    height: 25,
    margin: 10
  }
});

reactNative.YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

var MFCardPaymentView$$1 = function (_Component) {
  inherits(MFCardPaymentView$$1, _Component);

  function MFCardPaymentView$$1(props) {
    classCallCheck(this, MFCardPaymentView$$1);
    return possibleConstructorReturn(this, (MFCardPaymentView$$1.__proto__ || Object.getPrototypeOf(MFCardPaymentView$$1)).call(this, props));
  }

  createClass(MFCardPaymentView$$1, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _ref = Platform.OS === 'android',
        scalesPageToFit = _ref.scalesPageToFit;

      return React__default.createElement(reactNativeWebview.WebView, {
        ref: function ref(_ref2) {
          return _this2.webview = _ref2;
        },
        source: { html: this.buildHtmlText(this.props.sessionId, this.props.countryCode, this.props.labels, this.props.placeholders, this.props.theme, this.props.cardHeight, this.props.borderWidth, this.props.borderRadius, this.props.fontSize) },
        scalesPageToFit: scalesPageToFit,
        bounces: false,
        scrollEnabled: false,
        onMessage: function onMessage(event) {
          var json = JSON.parse(event.nativeEvent.data);
          if (json.sessionId != null) {
            _this2.request.sessionId = json.sessionId;
            MFPaymentRequest.sharedInstance.executePayment(_this2.navigation, _this2.request, _this2.apiLanguage, function (response) {
              _this2.postExecuteCallback(response);
            });
          } else {
            var responseError = new Response();
            responseError.setError('Error Message', json.error);
            _this2.postExecuteCallback(responseError);
          }
        }
      });
    }
  }, {
    key: 'pay',
    value: function pay(navigation, request, apiLanguage, postExecuteCallback) {
      this.navigation = navigation;
      this.request = request;
      this.apiLanguage = apiLanguage;
      this.postExecuteCallback = postExecuteCallback;
      this.webview.injectJavaScript('submit()');
    }
  }, {
    key: 'buildHtmlText',
    value: function buildHtmlText(sessionId, countryCode, labels, placeholders, theme, cardHeight, borderWidth, borderRadius, fontSize) {
      var librarySrc = "https://demo.myfatoorah.com/cardview/v1/session.js";
      if (MFSettings.sharedInstance.getInvironment() == MFEnvironment.LIVE) {
        librarySrc = "https://portal.myfatoorah.com/cardview/v1/session.js";
      }
      var HTML = '\n        <!DOCTYPE html>\n        <html lang="en">\n        \n        <head>\n            <meta charset="UTF-8">\n            <meta http-equiv="X-UA-Compatible" content="IE=edge">\n            <meta name="viewport" content="width=device-width,height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n            <style>body { overflow: hidden !important }</style>\n            <style>\n            *:not(input):not(textarea) {\n            -webkit-user-select: none; /* disable selection/Copy of UIWebView */\n                -webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */\n                -webkit-tap-highlight-color: rgba(0,0,0,0);\n            }\n          </style>\n          </head>\n        \n        <body>\n            <script src="' + librarySrc + '"></script>\n            <div style="width:100%">\n                <div id="card-element"></div>\n            </div>        \n            <script>\n                var config = {\n                  countryCode: "' + countryCode + '", // Here, add your Country Code.\n                  sessionId: "' + sessionId + '", // Here you add the "SessionId" you receive from InitiateSession Endpoint.\n                  cardViewId: "card-element",\n                  // The following style is optional.\n                  style: {\n                    cardHeight: ' + cardHeight + ',\n                    input: {\n                      color: "' + theme.inputColor + '",\n                      fontSize: "' + fontSize + 'px",\n                      fontFamily: "sans-serif",\n                      inputHeight: "32px",\n                      inputMargin: "0px",\n                      borderColor: "' + theme.inputColor + '",\n                      borderWidth: "' + borderWidth + 'px",\n                      borderRadius: "' + borderRadius + 'px",\n                      boxShadow: "",\n                      placeHolder: {\n                        holderName: "' + placeholders.cardHolderName + '",\n                        cardNumber: "' + placeholders.cardNumber + '",\n                        expiryDate: "' + placeholders.expiryDate + '",\n                        securityCode: "' + placeholders.cvv + '",\n                      }\n                    },\n                    label: {\n                      display: ' + labels.showLabels + ',\n                      color: "' + theme.labelColor + '",\n                      fontSize: "' + fontSize + 'px",\n                      fontFamily: "sans-serif",\n                      text: {\n                        holderName: "' + labels.cardHolderName + '",\n                        cardNumber: "' + labels.cardNumber + '",\n                        expiryDate: "' + labels.expiryDate + '",\n                        securityCode: "' + labels.cvv + '",\n                      },\n                    },\n                    error: {\n                      borderColor: "' + theme.errorColor + '",\n                      borderRadius: "' + borderRadius + 'px",\n                      boxShadow: "0px",\n                    },\n                  },\n              };\n              this.myFatoorah.init(config);\n        \n              function submit() {\n                    this.myFatoorah.submit()\n                    // On success\n                    .then(function (response) {\n                      var data = {\n                        sessionId: response["SessionId"],\n                        cardBrand : response["CardBrand"]\n                    };\n                    let stringJSON = JSON.stringify(data, "*")\n                    window.ReactNativeWebView.postMessage(stringJSON);\n                    },\n                    // In case of errors\n                    function (error) {\n                      var data = {\n                        error: error\n                    };\n                    let stringJSON = JSON.stringify(data, "*")\n                    window.ReactNativeWebView.postMessage(stringJSON);\n                    });\n                }\n            </script>\n        \n        </body>\n        \n        </html>\n        ';
      return HTML;
    }
  }]);
  return MFCardPaymentView$$1;
}(React.Component);

reactNative.YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

var MFInAppApplePayView$$1 = function (_Component) {
  inherits(MFInAppApplePayView$$1, _Component);

  function MFInAppApplePayView$$1(props) {
    classCallCheck(this, MFInAppApplePayView$$1);

    var _this = possibleConstructorReturn(this, (MFInAppApplePayView$$1.__proto__ || Object.getPrototypeOf(MFInAppApplePayView$$1)).call(this, props));

    _this.state = {
      link: ''
    };
    return _this;
  }

  createClass(MFInAppApplePayView$$1, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _ref = Platform.OS === 'android',
        scalesPageToFit = _ref.scalesPageToFit;

      if (this.state.link !== '') {
        return React__default.createElement(reactNativeWebview.WebView, {
          ref: function ref(_ref2) {
            return _this2.webview = _ref2;
          },
          source: { uri: this.state.link },
          scalesPageToFit: scalesPageToFit,
          bounces: false,
          scrollEnabled: false,
          enableApplePay: true,
          onMessage: function onMessage(event) {
            alert(event.nativeEvent.data);
            var json = JSON.parse(event.nativeEvent.data);
            if (json.sessionId != null) {
              _this2.request.sessionId = json.sessionId;
              _this2.requestExecutePayment();
            } else {
              var responseError = new Response();
              responseError.setError('Error Message', json.error);
              _this2.postExecuteCallback(responseError);
            }
          }
        });
      } else {
        return React__default.createElement(reactNative.View, { style: { height: 60, margin: 0, marginTop: 0, flexDirection: 'column', padding: 0, justifyContent: 'space-evenly', width: '100%' } });
      }
    }
  }, {
    key: 'requestExecutePayment',
    value: function requestExecutePayment() {
      var _this3 = this;

      var jsonData = executePaymentJson(this.request);
      issueRequest(jsonData, 'ExecutePayment', apiLanguage, false, function (response) {
        var errorMessage = response.errorMessage(false, true);
        if (errorMessage.length !== 0) {
          response.setError("Error Message", errorMessage);
          _this3.postExecuteCallback(response);
        } else {
          var url = response.getPaymentURL();
          var invoiceId = response.getInvoiceId();
          _this3.executeCallBack(url, invoiceId);
        }
      });
    }
  }, {
    key: 'executeCallBack',
    value: function executeCallBack(path, invoiceId) {
      var _this4 = this;

      issueRequest(undefined, path, this.apiLanguage, true, function (response) {
        var errorMessage = response.errorMessage(false, true);
        if (errorMessage.length !== 0) {
          response.setError("Error Message", errorMessage);
          postExecuteCallback(response);
        } else {
          _this4.getTransactions(invoiceId);
        }
      });
    }
  }, {
    key: 'getTransactions',
    value: function getTransactions(invoiceId) {
      var _this5 = this;

      var paymentStatusRequest = new MFPaymentStatusRequest(invoiceId, "InvoiceId");
      MFPaymentRequest.sharedInstance.getPaymentStatus(paymentStatusRequest, this.apiLanguage, function (response) {
        var errorMessage = response.errorMessage(false, false);
        if (errorMessage.length !== 0) {
          response.setError('Error Message', errorMessage);
          _this5.postExecuteCallback(response);
        } else {
          _this5.postExecuteCallback(response);
        }
      });
    }
  }, {
    key: 'load',
    value: function load(sessionId, countryCode, request, apiLanguage, postExecuteCallback) {
      this.sessionId = sessionId;
      this.countryCode = countryCode;
      this.request = request;
      this.apiLanguage = apiLanguage;
      this.postExecuteCallback = postExecuteCallback;
      var link = this.buildURL();
      this.setState({ link: link });
    }
  }, {
    key: 'buildURL',
    value: function buildURL() {
      var link = 'https://ap.myfatoorah.com/?sessionId=' + this.sessionId + '&countryCode=' + this.countryCode + '&currencyCode=' + this.request.displayCurrencyIso + '&amount=' + this.request.invoiceValue + '&platform=react';
      return link;
    }
  }]);
  return MFInAppApplePayView$$1;
}(React.Component);

exports.MFSettings = MFSettings;
exports.Response = Response;
exports.MFWebView = MFWebView$$1;
exports.MFTheme = MFTheme;
exports.MFCardPaymentView = MFCardPaymentView$$1;
exports.MFInAppApplePayView = MFInAppApplePayView$$1;
exports.MFInitiatePayment = MFInitiatePayment$$1;
exports.MFPaymentRequest = MFPaymentRequest;
exports.MFExecutePaymentRequest = MFExecutePaymentRequest$$1;
exports.MFCustomerAddress = MFCustomerAddress$$1;
exports.MFProduct = MFProduct$$1;
exports.MFSupplier = MFSupplier$$1;
exports.MFPaymentStatusRequest = MFPaymentStatusRequest$$1;
exports.MFCardInfo = MFCardInfo$$1;
exports.MFSendPaymentRequest = MFSendPaymentRequest$$1;
exports.MFLanguage = MFLanguage;
exports.MFNotificationOption = MFNotificationOption;
exports.MFPaymentype = MFPaymentype;
exports.MFMobileCountryCodeISO = MFMobileCountryCodeISO;
exports.MFCurrencyISO = MFCurrencyISO;
exports.MFKeyType = MFKeyType;
exports.MFEnvironment = MFEnvironment;
//# sourceMappingURL=index.js.map
