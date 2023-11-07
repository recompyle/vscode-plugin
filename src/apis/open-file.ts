import * as vscode from 'vscode';
import { FileCursor } from "../extension";

export async function openFile(cursor:FileCursor){
  try {
    // Define file path, line, and column
    const filePath = cursor.filePath; // Replace with the actual file path
    const line = cursor.line; // 0-based
    const column = cursor.column; // 0-based

    // Open the file
    const document = await vscode.workspace.openTextDocument(filePath);

    // Show the document and set the cursor position
    const editor = await vscode.window.showTextDocument(document, {
      viewColumn: vscode.ViewColumn.One
    });

    const position = new vscode.Position(line, column);
    const selection = new vscode.Selection(position, position);

    editor.selection = selection;
    editor.revealRange(selection);

  } catch (error) {
    vscode.window.showErrorMessage(`Failed to open file: ${error}`);
  }
}