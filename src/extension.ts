import path = require('path');
import * as vscode from 'vscode';
import * as request from 'request';

// this method is called when your extension is deactivated
export function deactivate() { }

let panel : vscode.WebviewPanel | undefined;
export async function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor((e) => {
		if (e && e.document.fileName) {
			let fileName = e.document.fileName.split('/').pop();
				fileName = fileName?.substring(0, fileName.lastIndexOf('.'));
				if (fileName) {
					let bjNumber = +fileName;
					if (!isNaN(bjNumber)) {
						if(!panel){
							vscode.window.showInformationMessage("Here");
							panel = vscode.window.createWebviewPanel('BJ','BJ',vscode.ViewColumn.Two);
						}
						panel.onDidDispose((e)=>{
							panel = undefined;
						});

						panel.title = `BJ ${bjNumber}`;
						request.get("https://www.acmicpc.net/problem/" + bjNumber, (err, res) => {
							if (err) {
								vscode.window.showErrorMessage("Unknown Error");
								panel?.dispose();
							}
							if(panel){
								panel.webview.html = res.body;
							}
							
						});
					}
				}
		}
	});
}