import type { 
  PublishConfig, 
  Content_file, 
  Message_FileContent, 
  Message_LoginInfo, 
  Message_ProxyConfig, 
  Message_TaskInfo,
  Message_rsPosts,
  } from '../renderer/src/index.d.ts'

export interface IElectronAPI {
  WinHandle: (command: string) => void,
  GetProxyConfig: () => Promise<string>,
  SetProxyConfig: (config: string) => void,
  OpenFile: (type: string) => Promise<string>,
  OpenDirectory: (path: string) => Promise<string>,
  CreateWithFile: (id: number, config: string) => Promise<string>,
  CreateWithText: (id: number, config: string) => Promise<string>,
  SaveContent: (id: number, config: string) => Promise<string>,
  CreateTask: (path: string, config: PublishConfig) => Promise<string>,
  OpenTask: (id: number) => Promise<{
    config: PublishConfig | undefined,
    status: string
  }>
  CheckTask: (id: number) => Promise<Message_FileContent>
  SaveFileContent: (id: number, type: string, content: string, title: string) => Promise<boolean>
  GetBangumiTags: (query: string) => Promise
  SearchBangumiTags: (query: string) => Promise
  GetLoginInfo: () => Promise<string>
  OpenLoginWindow: (type: string) => void
  RefreshLoginData: (loadData: Function) => void
  RefreshTaskData: (loadData: Function) => void
  SaveAccountInfo: (info: string) => void
  CheckLoginStatus: (type: string, value?: string) => void
  RemoveTask: (index: number) => void
  GetAllTask: () => Promise<Message_TaskInfo[]>
  GetPublishInfo: (id: number) => Promise<string>
  GetSiteInfo: (id: number) => Promise<string[]>
  GetBTLinks: (id: number) => Promise<string[]>
  CheckAccount: (type: string) => Promise<string>
  ReadFileContent: () => Promise<string>
  SetSiteUAP: (op: boolean, username: string, password: string) => Promise<string[]>
  Publish: (id: number, type: string) => Promise<string>
  SitePublish: (id: number, categories: string, imgsrc: string, title: string, content: string) => Promise<string>
  SiteRSPublish: (id: number, rsID: number, title: string, content: string) => Promise<string>
  GetSiteSrc: (id: number) => Promise<string>
  ClearStorage: () => void
  WriteClipboard: (str: string) => void
  SearchPosts: (str: string) => Promise<Message_rsPosts[]>
  LoadFromTxt: () => Promise<string[]>
  ExportCookies: (type: number) => void
  ImportCookies: (type: number) => void
  GetImageCaptcha: (loadImage: Function) => void
  GetReCaptcha: (loadImage: Function) => void
  ExportContent: (id: number, type: string) => void
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
