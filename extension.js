// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const getFiles = require('./helpers/getFiles');

const window = vscode.window;
const Disposable = vscode.Disposable;


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.componentEngine', () => {
			// Create and show a new webview
			const panel = vscode.window.createWebviewPanel(
				'componentEngine', // Identifies the type of the webview. Used internally
				'Component Engine', // Title of the panel displayed to the user
				vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
				{ enableScripts: true } // Webview options. More on these later.
			);

			const filename = require.resolve('./dist/index.html')
			fs.readFile(filename, 'utf8', (err, data) => {
				if (err) {
					console.log(err);
					throw err;
				}

				// Invoke the next step here however you like
				panel.webview.html = data;   // Put all of the code here (not the best solution)
			});
			
			const handleUpdate = () => {
				try {
					const dataObject = getFiles(window);
					panel.webview.postMessage(dataObject);
				} catch (error) {
					// todo: Panel should display posted error
					panel.webview.postMessage({ error });
				}
			}

			handleUpdate();
			let subscriptions = [];
			window.onDidChangeTextEditorSelection(handleUpdate, this, subscriptions);
			window.onDidChangeActiveTextEditor(handleUpdate, this, subscriptions);
			// create a combined disposable from both event subscriptions
			this._disposable = Disposable.from(...subscriptions);
		})
	);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
