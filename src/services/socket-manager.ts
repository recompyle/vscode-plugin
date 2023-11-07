import { SocketInstance } from "./socket";
import { getSettings } from "./settings";
import { AppSetting } from "../extension";

let settings: AppSetting[] | undefined = [];
let sockets: SocketInstance[] = [];

export function initSocketInstances() {
  clearSocketInstances();

  settings = getSettings();

  if (settings) {
    const ports = [...new Set(settings.map(set => set.port))];
    ports.forEach((pp, index) => {
      const allWorkspaceRoot = settings?.filter(s => s.port === pp).map(s => s.workspaceRoot);
      if (allWorkspaceRoot) {
        sockets[index] = new SocketInstance(pp, allWorkspaceRoot);
      }
    });
  }

}

export function getSettingsWithFilePath(filePath: string) {
  return settings?.find(setting => filePath.startsWith(setting.workspaceRoot))
}

export function getSocketWithFilePath(filePath: string) {
  const appSetting = getSettingsWithFilePath(filePath);
  if (appSetting) {
    return getSocketWithPort(appSetting.port);
  }
  return;
}

export function getSocketWithPort(port: number) {
  return sockets.find(s => s.port === port);
}

export function clearSocketInstances() {
  sockets?.forEach(s => s.close());
  sockets = [];
}