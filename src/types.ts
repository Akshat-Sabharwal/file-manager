export interface IFolder {
  readonly parentId: string;
  readonly id: string;
  name: string;
  parentPath: string;
  absolutePath: string;
  files?: string[];
}
