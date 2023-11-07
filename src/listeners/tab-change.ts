import * as vscode from 'vscode';
import { sendUpdateOpenedFiles } from "../apis/opened-files";

export let onTabChange = vscode.window.tabGroups.onDidChangeTabs(tab => {
  // console.log('onTabChange');
  tab.closed.forEach(tab => {
    // @ts-ignore
    if(tab?.input?.uri?.path){
      // @ts-ignore
      sendUpdateOpenedFiles(tab.input?.uri.path);
    }
  });
  tab.opened.forEach(tab => {
    // @ts-ignore
    if(tab?.input?.uri?.path){
      // @ts-ignore
      sendUpdateOpenedFiles(tab.input?.uri.path);
    }
  });
});
