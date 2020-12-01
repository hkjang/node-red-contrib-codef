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
/*#5.요청
 *  - 샌드박스 : EasyCodefConstant.SERVICE_TYPE_SANDBOX
 *  - 데모 : EasyCodefConstant.SERVICE_TYPE_DEMO
 *  - 운영 : EasyCodefConstant.SERVICE_TYPE_API
 */

let access_token = "";
codef.requestToken(EasyCodefConstant.SERVICE_TYPE_SANDBOX)
    .then(function (response) {
        /*
         * #6. 토큰 발급 결과
         */
        console.log('----------access_token----------');
        console.log(response);
        console.log('----------access_token----------');
        access_token = response;

    });

module.exports = function(RED) {
    "use strict";
    function codefOut(n) {
        RED.nodes.createNode(this,n);
        var self = this;
        this.action = n.action || "";
        this.param = n.param || "";
        this.on('input', function (msg) {
            const action = self.action || msg.action;
            const param = self.param || msg.param;
            self.log('------access_token------');
            self.log(access_token);
            self.error(action);
            self.error(param);
            /*
            * #5.요청 파라미터 설정
            * - 계정관리 파라미터를 설정(https://developer.codef.io/cert/account/cid-overview)
            */
            if(this.action === 'createAccount'){
                const accountList = []; // 계정 등록 리스트
                //+[인증서]
                // const accountCert = {
                //     countryCode: 'KR',
                //     businessType: 'BK',
                //     clientType: 'P',
                //     organization: '0004',
                //     loginType: '0',
                //     certType: '1',
                //     keyFile: EasyCodefUtil.encodeToFileString(
                //         path.join(__dirname, 'signPri.key')
                //     ),
                //     derFile: EasyCodefUtil.encodeToFileString(
                //         path.join(__dirname, 'signCert.der')
                //     ),
                //     password: EasyCodefUtil.encryptRSA(readConfigureFile().PUBLIC_KEY, 'user_password')
                // };
                // accountList.push(accountCert);

                //+ [아이디]
                const accountIDPWD = {
                    countryCode: 'KR',
                    businessType: 'BK',
                    clientType: 'P',
                    organization: '0081',
                    loginType: '1',
                    id: 'user_id',
                    password: EasyCodefUtil.encryptRSA(readConfigureFile().PUBLIC_KEY, 'user_password')
                };
                accountList.push(accountIDPWD);

                const param = {
                    accountList: accountList,
                };

                /*	#6.요청
                 *  [서비스 타입 설정]
                 *      - 샌드박스 : EasyCodefConstant.SERVICE_TYPE_SANDBOX
                 *      - 데모 : EasyCodefConstant.SERVICE_TYPE_DEMO
                 *      - 운영 : EasyCodefConstant.SERVICE_TYPE_API
                 */
                codef
                    .createAccount(EasyCodefConstant.SERVICE_TYPE_SANDBOX, param)
                    .then(function (response) {
                        /*
                         *  #7. 응답 결과
                         */
                        console.log(response);
                        self.log('------createAccount------');
                        self.log(response);
                        msg.payload = response;
                        self.send(msg);
                    });

            }else if(this.action === ''){ // '/v1/kr/card/p/account/card-list'
                /* #5.요청 파라미터 설정 - 각 상품별 파라미터를 설정(https://developer.codef.io/products) */
                // let param = {
                //     connectedId: '9GNB80TmkzNaX-E7zG....',
                //     organization: '0309',
                //     birthDate : '',
                //     inquiryType: '0'
                // };
                /* #6.코드에프 정보 조회 요청 - 서비스타입(API:정식, DEMO:데모, SANDBOX:샌드박스) */
                const productUrl = this.action; // (예시)개인 보유카드 조회 URL
                codef
                    .requestProduct(productUrl, EasyCodefConstant.SERVICE_TYPE_SANDBOX, param)
                    .then(function (response) {
                        // #7. 응답 결과
                        console.log(response);
                        self.log('------createAccount------');
                        self.log(response);
                        msg.payload = response;
                        self.send(msg);
                    });
            }else{
                const productUrl = this.action; // (예시)개인 보유카드 조회 URL
                codef
                    .requestProduct(productUrl, EasyCodefConstant.SERVICE_TYPE_SANDBOX, param)
                    .then(function (response) {
                        // #7. 응답 결과
                        console.log(response);
                        self.log('------createAccount------');
                        self.log(response);
                        msg.payload = response;
                        self.send(msg);
                    });
            }

        });
    }
    RED.nodes.registerType("codef", codefOut);
};
