const fs = require('fs');
const path = require('path');

const preCode = `
const { useState, useEffect } = React;
`;

const postCode = (name) => `
render(<${name} />);
`;

function getFiles(window) {
    let editor = window.activeTextEditor;
    if (!editor) throw new Error('No active text editor');

    const doc = editor.document;
    const fileName = doc.fileName;
    const parentDir = path.dirname(fileName);

    const componentSpecUrl = `${parentDir}/component-engine.json`;

    let componentSpec;
    if (componentSpecUrl === fileName) {
        componentSpec = JSON.parse(doc.getText());
    } else {
        componentSpec = JSON.parse(fs.readFileSync(`${parentDir}/component-engine.json`, 'utf8'));
    }
    if (!componentSpec) throw new Error('Cannot find component spec');

    const componentUrl = `${parentDir}/${componentSpec.main}`;

    let component;
    if (componentUrl === fileName) {
        component = doc.getText();
    } else {
        component = fs.readFileSync(`${parentDir}/${componentSpec.main}`, 'utf8');
    }
    if (!component) throw new Error('Cannot find component');

    return ({
        component: `${preCode}${component}${postCode(componentSpec.name)}`,
        componentSpec,
    });
}

module.exports = getFiles;