export interface IFolder {
  name: string;
  parentPath: string;
  absolutePath: string;
  files?: string[];
  folders?: IFolder[];
  isCurrent: boolean;
}
