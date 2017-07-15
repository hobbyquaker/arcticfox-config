const fs = require('fs');

const dir = fs.readdirSync('../../NFirmwareEditor/src/NCore/Languages/');

dir.forEach(file => {
	const match = file.match(/([A-Z]+)\.lpack\.txt/);
	if (match) {
		convert(match[1], fs.readFileSync('../../NFirmwareEditor/src/NCore/Languages/' + file).toString());
	}
});

function convert(lang, lines) {
	const res = {};
	lines.split('\n').forEach(line => {
		const match = line.match(/Toolbox\.ArcticFoxConfiguration\.([A-Za-z0-9-_.]+)=(.*)/);
		if (match) {
			if (match[2].startsWith('NFE Toolbox')) {
				match[2] = match[2].replace('NFE Toolbox', 'Arcticfox Config');
			}
			match[2] = match[2].replace(/\\n/g, '\n');
			res[match[1]] = match[2];
		}
	});
	console.log(lang);
	fs.writeFileSync('../i18n/' + lang.toLowerCase() + '.json', JSON.stringify(res, null, '  '));
}
