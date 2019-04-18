'use strict';
const path = require('path');

/*
 * @description: webpack 번들링시 필요한 데이터 설정
 */

module.exports = {
    resultPath : `/dist`,                                   // 최종 빌드 파일 경로
    dev: {                                                  // ** [ 개발 ] ** 
        publicPath : '/',                                   // 빌드 파일 publicPath 경로
        host:'127.0.0.1',                                   // 로컬
        target_host : '127.0.0.1',                          // spring ntour
        port: 9999,                                         // port
        openBrowser: true,                                  // express 웹 서버 옵션 - 브라우저 오픈 여부
        errorOverlay: true,                                 // express 웹 서버 옵션 - 에러 노출 여부
        devtool: '#source-map',                             // source-map 설정
    },
    build: {                                                // ** [ 배포 ] **
        publicPath : `/dist`,                               // 빌드 파일 publicPath 경로
        bundleAnalyzerReport : true,                        // 번들링 분석 리포트 활성 여부 
        devtool: 'none',                                    // source-map 설정
    }
};
