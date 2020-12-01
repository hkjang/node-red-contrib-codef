node-red-contrib-codef
========================

<a href="http://nodered.org" target="_new">Node-RED</a> 

<a href="https://www.npmjs.com/package/easycodef-node" target="_new">easycodef-node wrapper</a>.

Install
-------

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-codef --save

## How to use

###  To use node-red-contrib-codef, you must first create an authentication key.

### Save the generated authentication key information.

- Save the authentication key information to ~/.codef/configure for Mac/Linux and C:\Users\USERNAME\\.codef\configure for Windows.

- ~/.codef/configure example

```
DEMO_CLIENT_ID=
DEMO_CLIENT_SECRET=
CLIENT_ID=
CLIENT_SECRET=
PUBLIC_KEY=
SERVICE_TYPE=SERVICE_TYPE_SANDBOX
```

Usage
-----

## codef  

<i><a href="https://www.npmjs.com/package/easycodef-node" target="_new">codef</a></i> api request node.

### action 
- need action
    - createAccount 
    - /v1/kr/card/p/account/card-list
    - ...


## request parameter sample 
```javascript
msg.action = 'createAccount';
msg.accountList = [];
const accountIDPWD = {
  countryCode: 'KR',
  businessType: 'BK',
  clientType: 'P',
  organization: '0081',
  loginType: '1',
  id: 'user_id',
  password: 'user_password'
};

msg.accountList.push(accountIDPWD);

// get card list
msg.action = '/v1/kr/card/p/account/card-list';
msg.param = {
  connectedId: 'byi1wYwD40k8hEIiXl6bRF',
  organization: '0309',
  birthDate : '',
  inquiryType: '0'
};
return msg;
```

## sample flow

- Ctrl+c & Ctrl+v by import function

```json
[{"id":"49af75a4.88ee6c","type":"codef","z":"4d37b745.a13678","action":"","x":490,"y":80,"wires":[["682d40ff.8a56a"]]},{"id":"359f9ea2.c73c62","type":"inject","z":"4d37b745.a13678","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":160,"y":80,"wires":[["39f7fe1.1329002"]]},{"id":"738de18c.a3be8","type":"debug","z":"4d37b745.a13678","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":950,"y":80,"wires":[]},{"id":"39f7fe1.1329002","type":"function","z":"4d37b745.a13678","name":"","func":"msg.action = 'createAccount';\nmsg.accountList = [];\nconst accountIDPWD = {\n  countryCode: 'KR',\n  businessType: 'BK',\n  clientType: 'P',\n  organization: '0081',\n  loginType: '1',\n  id: 'user_id',\n  password: 'user_password'\n};\n\nmsg.accountList.push(accountIDPWD);\n\n// get card list\nmsg.action = '/v1/kr/card/p/account/card-list';\nmsg.param = {\n  connectedId: 'byi1wYwD40k8hEIiXl6bRF',\n  organization: '0309',\n  birthDate : '',\n  inquiryType: '0'\n};\n\n  \nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":320,"y":80,"wires":[["49af75a4.88ee6c"]]},{"id":"3074d281.9c74ee","type":"function","z":"4d37b745.a13678","name":"","func":"\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":800,"y":80,"wires":[["738de18c.a3be8"]]},{"id":"682d40ff.8a56a","type":"json","z":"4d37b745.a13678","name":"","property":"payload","action":"","pretty":false,"x":630,"y":80,"wires":[["3074d281.9c74ee"]]}]
```

## result 

```json
{
  "result": {
    "code": "CF-00000",
    "extraMessage": "",
    "message": "성공",
    "transactionId": "5069429e367745baba92f5c12c4343de"
  },
  "data": [
    {
      "resCardType": "체크/본인",
      "resValidPeriod": "",
      "resCardName": "OO체크카드-국제ATM",
      "resTrafficYN": "불가능",
      "resIssueDate": "",
      "resUserNm": "***",
      "resSleepYN": "",
      "resCardNo": "6056********0000"
    },
    {
      "resCardType": "신용/본인",
      "resValidPeriod": "",
      "resCardName": "할인카드",
      "resTrafficYN": "불가능",
      "resIssueDate": "",
      "resUserNm": "***",
      "resSleepYN": "",
      "resCardNo": "6253********0000"
    },
    {
      "resCardType": "체크/본인",
      "resValidPeriod": "",
      "resCardName": "OO체크카드",
      "resTrafficYN": "불가능",
      "resIssueDate": "",
      "resUserNm": "***",
      "resSleepYN": "",
      "resCardNo": "4214********0000"
    }
  ]
}

```
