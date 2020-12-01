const os = require('os');
const fs = require('fs');
const path = require('path');
const ini = require('ini');
const {
    EasyCodef,
    EasyCodefConstant,
    EasyCodefUtil,
} = require('easycodef-node');
/*
 *#1.쉬운 코드에프 객체 생성
 */
const codef = new EasyCodef();
/*
 *#2.RSA암호화를 위한 퍼블릭키 설정
 * - 데모/정식 서비스 가입 후 코드에프 홈페이지에 확인 가능(https://codef.io/#/account/keys)
 * - 암호화가 필요한 필드에 사용 - encryptValue(String plainText);
 */
codef.setPublicKey(readConfigureFile().PUBLIC_KEY);

/*
 *#3.데모 클라이언트 정보 설정
 * - 데모 서비스 가입 후 코드에프 홈페이지에 확인 가능(https://codef.io/#/account/keys)
 * - 데모 서비스로 상품 조회 요청시 필수 입력 항목
 */
codef.setClientInfoForDemo(readConfigureFile().DEMO_CLIENT_ID, readConfigureFile().DEMO_CLIENT_SECRET);

/*
 * #4.정식 클라이언트 정보 설정
 * - 정식 서비스 가입 후 코드에프 홈페이지에 확인 가능(https://codef.io/#/account/keys)
 * - 정식 서비스로 상품 조회 요청시 필수 입력 항목
 */
codef.setClientInfo(readConfigureFile().CLIENT_ID, readConfigureFile().CLIENT_SECRET);

function getConfigureFilePath() {
    return path.join(
        os.homedir(),
        '.codef',
        'configure',
    );
}
function readConfigureFile() {
    const configureFile = getConfigureFilePath();
    if (!fs.existsSync(configureFile)) {
        console.error('Please check configure file (*inx : $HOME/.codef/configure , Windows : %HOME%₩.codef₩configure)');
        return {};
    }
    return ini.parse(fs.readFileSync(getConfigureFilePath(), 'utf-8'));
}

let access_token = "";
codef.requestToken(EasyCodefConstant[readConfigureFile().SERVICE_TYPE])
    .then(function (response) {
        /*
         * #6. 토큰 발급 결과
         */
        access_token = response;

    });
module.exports = function(RED) {
    "use strict";
    function codefOut(n) {
        RED.nodes.createNode(this,n);
        var self = this;
        this.action = n.action || "";
        this.param = n.param || "";
        this.accountList = n.accountList || "";
        this.on('input', function (msg) {
            const action = self.action || msg.action;
            const param = self.param || msg.param;
            const accountList = self.accountList || msg.accountList;
            self.error(action);
            self.error(param);
            /*
            * #5.요청 파라미터 설정
            * - 계정관리 파라미터를 설정(https://developer.codef.io/cert/account/cid-overview)
            */
            if(action === 'createAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(readConfigureFile().PUBLIC_KEY, accountList[i].password);
                    }
                }
                const param = {
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[readConfigureFile().SERVICE_TYPE], param)
                    .then(function (response) {
                        msg.payload = response;
                        self.send(msg);
                    });
            }else if(action === 'addAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(readConfigureFile().PUBLIC_KEY, accountList[i].password);
                    }
                }
                const param = {
                    connectedId : param.connectedId,
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[readConfigureFile().SERVICE_TYPE], param)
                    .then(function (response) {
                        msg.payload = response;
                        self.send(msg);
                    });
            }else if(action === 'updateAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(readConfigureFile().PUBLIC_KEY, accountList[i].password);
                    }
                }
                const param = {
                    connectedId : param.connectedId,
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[readConfigureFile().SERVICE_TYPE], param)
                    .then(function (response) {
                        msg.payload = response;
                        self.send(msg);
                    });
            }else if(action === 'deleteAccount'){
                for(var i in accountList){
                    if(accountList[i].password){
                        accountList[i].password = EasyCodefUtil.encryptRSA(readConfigureFile().PUBLIC_KEY, accountList[i].password);
                    }
                }
                const param = {
                    connectedId : param.connectedId,
                    accountList: accountList,
                };
                codef[action](EasyCodefConstant[readConfigureFile().SERVICE_TYPE], param)
                    .then(function (response) {
                        msg.payload = response;
                        self.send(msg);
                    });
            }else{
                codef.requestProduct(action, EasyCodefConstant[readConfigureFile().SERVICE_TYPE], param)
                    .then(function (response) {
                        // #7. 응답 결과
                        msg.payload = response;
                        self.send(msg);
                    });
            }
        });
    }
    RED.nodes.registerType("codef", codefOut);
};
