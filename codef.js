const {
    EasyCodef,
    EasyCodefConstant,
    EasyCodefUtil,
} = require('easycodef-node');

const codef = new EasyCodef();

module.exports = function(RED) {
    "use strict";
    function codefOut(n) {
        RED.nodes.createNode(this,n);
        if (RED.nodes.getNode(n.creds)){
            this.clientId = RED.nodes.getNode(n.creds).credentials.clientId;
            this.clientSecret = RED.nodes.getNode(n.creds).credentials.clientSecret;
            this.publicKey = RED.nodes.getNode(n.creds).credentials.publicKey;
            this.serviceType = RED.nodes.getNode(n.creds).credentials.serviceType;
        } else {
            this.clientId = "";
            this.clientSecret = "";
            this.publicKey = "";
            this.serviceType = "";
        }
        codef.setPublicKey(this.publicKey);
        codef.setClientInfoForDemo(this.clientId, this.clientSecret);
        codef.setClientInfo(this.clientId, this.clientSecret);
        let access_token = "";
        codef.requestToken(EasyCodefConstant[this.serviceType])
            .then(function (response) {
                access_token = response;
            });
        var node = this;
        this.action = n.action || "";
        this.param = n.param || "";
        this.accountList = n.accountList || "";
        this.on('input', function (msg) {
            const action = node.action || msg.action;
            const param = node.param || msg.param;
            const accountList = node.accountList || msg.accountList;
            node.error(action);
            node.error(param);

            if(action === 'createAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(node.publicKey, accountList[i].password);
                    }
                }
                const param = {
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[node.serviceType], param)
                    .then(function (response) {
                        msg.payload = response;
                        node.send(msg);
                    });
            }else if(action === 'addAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(node.publicKey, accountList[i].password);
                    }
                }
                const param = {
                    connectedId : param.connectedId,
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[node.serviceType], param)
                    .then(function (response) {
                        msg.payload = response;
                        node.send(msg);
                    });
            }else if(action === 'updateAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(node.publicKey, accountList[i].password);
                    }
                }
                const param = {
                    connectedId : param.connectedId,
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[node.serviceType], param)
                    .then(function (response) {
                        msg.payload = response;
                        node.send(msg);
                    });
            }else if(action === 'deleteAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(node.publicKey, accountList[i].password);
                    }
                }
                const param = {
                    connectedId : param.connectedId,
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[node.serviceType], param)
                    .then(function (response) {
                        msg.payload = response;
                        node.send(msg);
                    });
            }else{
                codef.requestProduct(action, EasyCodefConstant[node.serviceType], param)
                    .then(function (response) {
                        // #7. 응답 결과
                        msg.payload = response;
                        node.send(msg);
                    });
            }
        });
    }

    RED.nodes.registerType("codef", codefOut, {
        credentials: {
            clientId: {type:"text"},
            clientSecret: {type:"text"},
            publicKey: {type:"text"},
            serviceType: {type:"text"}
        }
    });

    function codefkey(n){
        RED.nodes.createNode(this, n);
        this.clientId = n.clientId;
        this.clientSecret = n.clientSecret;
        this.publicKey = n.publicKey;
        this.serviceType = n.serviceType;
    }

    RED.nodes.registerType("codefkey", codefkey,{
        credentials: {
            clientId: {type:"text"},
            clientSecret: {type:"text"},
            publicKey: {type:"text"},
            serviceType: {type:"text"}
        }
    });
};
