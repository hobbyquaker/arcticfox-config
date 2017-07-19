const AfcFile = require('../afcfile');
const fs = require('fs');

const afc = new AfcFile();

const xml = afc.decodeAfc(fs.readFileSync(__dirname + '/../default.afc'));

fs.writeFileSync(__dirname + '/../default.afc.xml', xml);

afc.xml2conf(xml, (err, res) => {
    fs.writeFileSync(__dirname + '/../default.afc.json', JSON.stringify(res, null, '  '));

    const rexml = afc.conf2xml(res);
    fs.writeFileSync(__dirname + '/../default_re.afc.xml', rexml);
});
