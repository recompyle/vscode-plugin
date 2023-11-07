import * as vscode from 'vscode';
import { onConfigChange } from "./config-change";
import { onBreakpointUpdate } from "./breakpoint-update";
import { onTabChange } from "./tab-change";

export function initListeners(context: vscode.ExtensionContext) {
  context.subscriptions.push(onConfigChange);
  context.subscriptions.push(onBreakpointUpdate);
  context.subscriptions.push(onTabChange);
}