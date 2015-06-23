'use strict';

var GulpConfig = (function () {
    function GulpConfig() {
        this.src = './src';
        this.webappSrc = this.src + '/webapp';
        this.dest = './public';
        this.typingsDir = './typings';

        this.outputFile = 'angular2-boilerplate';
        this.outputCSSDir = '/css';
        this.outputLibDir = '/lib';

        this.mainLessFile = this.webappSrc + '/assets/styles/main.less';
        this.allHTML = [
            this.webappSrc + '/*.html',
            this.webappSrc + '/**/*.html'
        ];
        this.allLess = this.webappSrc + '/assets/styles/**/*.less';
        this.allTypeScript = this.webappSrc + '/**/*.ts';
        this.allJavaScript = '/**/*.js';
        this.allJavaScriptSourceMap = '/**/*.js.map';
        this.allLib = [
            'bower_components/traceur-runtime/traceur-runtime.js'
        ];

        this.serverPath = this.src + '/server/server.js';

        this.libraryTypeScriptDefinitions = this.typingsDir + '/**/*.ts';
        this.appTypeScriptReferences = this.typingsDir + '/tsd.d.ts';
    }

    return GulpConfig;
})();

module.exports = GulpConfig;
