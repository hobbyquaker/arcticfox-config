# arcticfox-config

[![Dependency Status](https://david-dm.org/hobbyquaker/arcticfox-config/status.svg)](https://david-dm.org/hobbyquaker/arcticfox-config)
[![devDependency Status](https://david-dm.org/hobbyquaker/arcticfox-config/dev-status.svg)](https://david-dm.org/hobbyquaker/arcticfox-config?type=dev)
[![Build Status](https://travis-ci.org/hobbyquaker/arcticfox-config.svg?branch=master)](https://travis-ci.org/hobbyquaker/arcticfox-config)
[![Github All Releases](https://img.shields.io/github/downloads/hobbyquaker/arcticfox-config/total.svg)]()
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

> Configuration Tool for Vape Battery Mods with Arcticfox Firmware. Works on MacOS and Linux.

**Warning**: This is work in progress, one could call it a "first beta version". Several things are still missing, there
are probably a lot of bugs... 

![Screenshot](screenshot.png "Screenshot")


### Download

#### macOS

Go to the [latest release page](https://github.com/hobbyquaker/arcticfox-config/releases/latest) and download the 
arcticfox-config-x.x.x.dmg file.

#### Linux

On the [latest release page](https://github.com/hobbyquaker/arcticfox-config/releases/latest) you can find a .deb file 
for Ubuntu and Debian and a .tar.gz that should work on other distributions.


### Usage

Start the Application, connect your Arcticfox Device.


### Contributing

Clone the repo, do `npm install` in the project root. Use `npm start` to start the application in debug mode.
Depending on your installed Node.js version it might be necessary to rebuild the USB HID module:
`./node_modules/.bin/electron-rebuild`


### Related

* https://github.com/hobbyquaker/arcticfox-monitor - A device monitoring tool for vape battery mods with Arcticfox firmware. Works on macOS and Linux.
* https://github.com/hobbyquaker/arcticfox - a Node module that abstracts the HID communication with the Arcticfox 
firmware and is also used by this project.
* https://github.com/hobbyquaker/dna-monitor - a macOS and Linux device config for battery mods with the DNA chipset.


### Credits

Based on the work of [NFE Team](https://nfeteam.org/)

* https://github.com/maelstrom2001/ArcticFox
* https://github.com/TBXin/NFirmwareEditor


### License

GPLv3

Copyright (c) Sebastian Raff
