node-red-contrib-codef
========================

<a href="http://nodered.org" target="_new">Node-RED</a> 

<a href="https://www.npmjs.com/package/easycodef-node" target="_new">easycodef-node wrapper</a>.

Install
-------

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-codef --save

## How to use

  #### 서비스 타입 설정 및 키 설정 - ~/.codef/configure
      - 샌드박스 : SERVICE_TYPE=SERVICE_TYPE_SANDBOX
      - 데모 : SERVICE_TYPE=SERVICE_TYPE_DEMO
      - 운영 : SERVICE_TYPE=SERVICE_TYPE_API
      
 #### 요청 파라미터 설정
   - 계정관리 파라미터를 설정(https://developer.codef.io/cert/account/cid-overview)
   

 #### 응답 결과 확인
 
 ------------
 
###  To use node-red-contrib-codef, you must first create an authentication key.

### Save the generated authentication key information.

- Save the authentication key information to ~/.codef/configure for Mac/Linux and C:\Users\USERNAME\\.codef\configure for Windows.

- ~/.codef/configure example

```
#- 샌드박스 : EasyCodefConstant.SERVICE_TYPE
#- 데모 : EasyCodefConstant.SERVICE_TYPE_DEMO
#- 운영 : EasyCodefConstant.SERVICE_TYPE_API

DEMO_CLIENT_ID=
DEMO_CLIENT_SECRET=
CLIENT_ID=
CLIENT_SECRET=
PUBLIC_KEY=
SERVICE_TYPE=SERVICE_TYPE_SANDBOX or SERVICE_TYPE_API or SERVICE_TYPE_DEMO

```

## codef  

<i><a href="https://www.npmjs.com/package/easycodef-node" target="_new">codef</a></i> api request node.

### action parameter
- need action
    - createAccount 
    - addAccount 
    - updateAccount 
    - deleteAccount 
    - /v1/kr/card/p/account/card-list : 카드 보유 리스트
    - /v1/kr/bank/b/account/account-list : 은행 보유 계좌 리스트
    - refer to other api on https://developer.codef.io/products

### param parameter
- need param

### accountList parameter
- need accountList if action is createAccount, addAccount, updateAccount, deleteAccount

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
- all of samples : https://github.com/hkjang/node-red-contrib-codef/blob/main/sample_flows.json
- some samples
```json

[{"id":"63d6961d.1a8c38","type":"codef","z":"d4ad27e3.29f578","action":"","x":710,"y":60,"wires":[["68b7fffa.020c3"]]},{"id":"aa25d4a6.53fbd8","type":"inject","z":"d4ad27e3.29f578","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":100,"y":60,"wires":[["c6a832a5.dc6f8"]]},{"id":"3e5c27f0.1fa6d8","type":"debug","z":"d4ad27e3.29f578","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1210,"y":60,"wires":[]},{"id":"c6a832a5.dc6f8","type":"function","z":"d4ad27e3.29f578","name":"createAccount","func":"// create account\nmsg.action = 'createAccount';\nmsg.accountList = [];\nconst accountIDPWD = {\n  countryCode: 'KR',\n  businessType: 'BK',\n  clientType: 'P',\n  organization: '0081',\n  loginType: '1',\n  id: 'user_id',\n  password: 'user_password'\n};\n\nmsg.accountList.push(accountIDPWD);\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":280,"y":60,"wires":[["63d6961d.1a8c38"]]},{"id":"52aae555.6a6dbc","type":"function","z":"d4ad27e3.29f578","name":"","func":"\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":1020,"y":60,"wires":[["3e5c27f0.1fa6d8"]]},{"id":"68b7fffa.020c3","type":"json","z":"d4ad27e3.29f578","name":"","property":"payload","action":"","pretty":false,"x":850,"y":60,"wires":[["52aae555.6a6dbc"]]},{"id":"358c95f7.f7504a","type":"function","z":"d4ad27e3.29f578","name":"/v1/kr/card/p/account/card-list","func":"// get card list\nmsg.action = '/v1/kr/card/p/account/card-list';\n\nmsg.param = {\n  connectedId: 'byi1wYwD40k8hEIiXl6bRF',\n  organization: '0309',\n  birthDate : '',\n  inquiryType: '0'\n};\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":320,"y":100,"wires":[["63d6961d.1a8c38"]]},{"id":"ca3d68db.7fa998","type":"function","z":"d4ad27e3.29f578","name":"/v1/kr/bank/p/account/transaction-list","func":"// get transaction list\nmsg.action = '/v1/kr/bank/p/account/transaction-list';\nmsg.param = {\n  connectedId: 'byi1wYwD40k8hEIiXl6bRF',\n  organization: '0309',\n  account : '1002440000000',\n  orderBy : '0',\n  startDate : '20200101',\n  endDate: '20201202'\n};\n\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":350,"y":140,"wires":[["63d6961d.1a8c38"]]},{"id":"36310e47.03c5c2","type":"inject","z":"d4ad27e3.29f578","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":100,"y":100,"wires":[["358c95f7.f7504a"]]},{"id":"a7926daa.cbec7","type":"inject","z":"d4ad27e3.29f578","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":100,"y":140,"wires":[["ca3d68db.7fa998"]]}]

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
