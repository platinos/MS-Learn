this.locations = {
        root: self.root,
        www: path.join(self.root, 'assets/www'),
        res: path.join(self.root, 'res'),
        platformWww: path.join(self.root, 'platform_www'),
        configXml: path.join(self.root, 'app/src/main/res/xml/config.xml'),
        defaultConfigXml: path.join(self.root, 'cordova/defaults.xml'),
        strings: path.join(self.root, 'app/src/main/res/values/strings.xml'),
        manifest: path.join(self.root, 'app/src/main/AndroidManifest.xml'),
        build: path.join(self.root, 'build'),
        javaSrc: path.join(self.root, 'app/src/main/java/'),
        // NOTE: Due to platformApi spec we need to return relative paths here
        cordovaJs: 'bin/templates/project/assets/www/cordova.js',
        cordovaJsSrc: 'cordova-js-src'
    };