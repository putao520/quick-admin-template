import type {Readable as ReadableStream} from "stream";
import type File from "node:fs";

export interface Storage{
    // 上传文件
    uploadFile: (filePath: string, fileName: string) => Promise<string>;
    // 上传base64
    uploadBase64: (base64: string, fileName: string) => Promise<string>;
    // 上传buffer
    uploadBuffer: (buffer: Buffer, fileName: string) => Promise<string>;
    // 上传stream
    uploadStream: (stream: ReadableStream, fileName: string) => Promise<string>;
    // 删除文件
    deleteFile: (fileName: string) => Promise<void>;
    // 获取文件url
    getFileUrl: (fileName: string) => Promise<string>;
    // 获取文件流
    getFileStream: (fileName: string) => Promise<ReadableStream>;
    // 获取文件buffer
    getFileBuffer: (fileName: string) => Promise<Buffer>;
    // 获取文件base64
    getFileBase64: (fileName: string) => Promise<string>;
    // 获取文件
    getFile: (fileName: string) => Promise<Buffer>;
    // 获取文件列表
    getFileList: (prefix: string, dir:string, max: number) => Promise<string[]>;
}
