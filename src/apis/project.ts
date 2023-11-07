import * as vscode from 'vscode';

export function isFileInAllWorkspaceRoot(filePath: string, allWorkspaceRoot: string[]) {
  return allWorkspaceRoot.find(w => filePath.startsWith(w)) !== null;
}