import path = require('path');
import * as vscode from 'vscode';
import * as request from 'request';

// this method is called when your extension is deactivated
export function deactivate() { }

export async function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('bj-viewer.open', () => {
		if (vscode.window.activeTextEditor) {
			var fileName = path.basename(vscode.window.activeTextEditor.document.fileName).split('.')[0];
			let bjNumber = +fileName;
			if (!isNaN(bjNumber)) {
				vscode.window.showInformationMessage(bjNumber.toString());
				const panel = vscode.window.createWebviewPanel(
					'BJ',
					`BJ ${bjNumber}`,
					vscode.ViewColumn.Two,
					{}
				);
				request.get("https://www.acmicpc.net/problem/" + bjNumber, (err, res) => {
					if (err) {
						vscode.window.showErrorMessage("Unknown Error");
						console.log(err);
						panel.dispose();
					}
					panel.webview.html = res.body;
				});
			}
		}
	});

	context.subscriptions.push(disposable);

}