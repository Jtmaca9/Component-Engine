const fs = require('fs');
const path = require('path');

function getFiles(window) {
    let editor = window.activeTextEditor;
    if (!editor) return;

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
    if (!componentSpec) return;

    const componentUrl = `${parentDir}/${componentSpec.main}`;

    let component;
    if (componentUrl === fileName) {
        component = doc.getText();
    } else {
        component = fs.readFileSync(`${parentDir}/${componentSpec.main}`, 'utf8');
    }
    if (!component) return;

    return ({
        component,
        componentSpec,
    });
}

module.exports = getFiles;