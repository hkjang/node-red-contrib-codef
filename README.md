node-red-contrib-codef
========================

<a href="http://nodered.org" target="_new">Node-RED</a> 

<a href="https://www.npmjs.com/package/easycodef-node" target="_new">easycodef-node wrapper</a>.

Install
-------

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-codef --save

## 시작하기

###  To use node-red-contrib-codef, you must first create an authentication key.

### Save the generated authentication key information.

- Save the authentication key information to ~/.codef/configure for Mac/Linux and C:\Users\USERNAME\\.codef\configure for Windows.

- ~/.codef/configure example

```
DEMO_CLIENT_ID = '';
DEMO_CLIENT_SECRET = '';
CLIENT_ID = '';
CLIENT_SECRET = '';
PUBLIC_KEY = '';

```

Usage
-----

## codef  

<i><a href="https://www.npmjs.com/package/easycodef-node" target="_new">codef</a></i> api request node.

### action 
- need action, ex) createAccount .. 


## request parameter sample 
```javascript
msg.action = 'createAccount';
//
```

## sample flow

- Ctrl+c & Ctrl+v by import function

```json

```

## result 


```json


```
