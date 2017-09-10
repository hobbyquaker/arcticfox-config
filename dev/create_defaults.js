const AfcFile = require('../afcfile');
const fs = require('fs');

const afc = new AfcFile();

const xml = afc.decodeAfc(fs.readFileSync(__dirname + '/../default-p11.afc'));

fs.writeFileSync(__dirname + '/../default-p11.afc.xml', xml);

afc.xml2conf(xml, (err, res) => {
    fs.writeFileSync(__dirname + '/../default-p11.afc.json', JSON.stringify(res, null, '  '));

    const rexml = afc.conf2xml(res);
    fs.writeFileSync(__dirname + '/../default_re-p11.afc.xml', rexml);
});
