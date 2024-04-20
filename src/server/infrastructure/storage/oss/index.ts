import {env} from "~/env";
import Minio, {type BucketItem, type Client, type ClientOptions} from 'minio';
import {type Storage} from "~/server/infrastructure/storage/interface";
import type {Readable as ReadableStream} from "stream";
import * as os from "node:os";
import * as fs from "node:fs";
export interface OssConfig extends ClientOptions {
    bucket: string;
}

const global_oss_file: Record<string, OssFile> = {};

class OssFile implements Storage {
    private config: OssConfig;
    private client: Client;
    constructor(config: OssConfig){
        this.config = config;
        const client = new Minio.Client(config)
        client.bucketExists(config.bucket, (err, exists) => {
            if(err ?? !exists){
                void client.makeBucket(config.bucket)
            }
        })
        this.client = client
    }
    // 上传文件
    async uploadFile(filePath: string, fileName: string): Promise<string> {
        const result = await this.client.fPutObject(this.config.bucket, fileName, filePath);
        return result.etag;
    }
    // 上传base64
    async uploadBase64(base64: string, fileName: string): Promise<string> {
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        const result = await this.client.putObject(this.config.bucket, fileName, Buffer.from(base64Data, 'base64'));
        return result.etag;
    }
    // 上传buffer
    async uploadBuffer(buffer: Buffer, fileName: string): Promise<string> {
        const result = await this.client.putObject(this.config.bucket, fileName, buffer);
        return result.etag;
    }
    // 上传stream
    async uploadStream(stream: ReadableStream, fileName: string): Promise<string> {
        const result = await this.client.putObject(this.config.bucket, fileName, stream);
        return result.etag;
    }
    // 删除文件
    async deleteFile(fileName: string): Promise<void> {
        await this.client.removeObject(this.config.bucket, fileName);
    }
    // 获取文件url
    async getFileUrl(fileName: string): Promise<string> {
        return await this.client.presignedUrl('GET', this.config.bucket, fileName);
    }
    // 获取文件流
    async getFileStream(fileName: string): Promise<ReadableStream> {
        return await this.client.getObject(this.config.bucket, fileName);
    }
    // 获取文件buffer
    async getFileBuffer(fileName: string): Promise<Buffer> {
        const stream = await this.client.getObject(this.config.bucket, fileName);
        const chunks: Buffer[] = [];
        for await (const s of stream) {
            const chunk = s as Buffer;
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
    // 获取文件base64
    async getFileBase64(fileName: string): Promise<string> {
        const buffer = await this.getFileBuffer(fileName);
        return buffer.toString();
    }
    // 获取文件
    async getFile(fileName: string): Promise<Buffer> {
        // 跨平台获得临时文件
        const tmpDir = os.tmpdir();
        const tmpFile = `${tmpDir}/${fileName}`;
        await this.client.fGetObject(this.config.bucket, fileName, tmpFile);
        return fs.readFileSync(tmpFile);
    }
    // 获取文件列表
    async getFileList(prefix: string, dir:string, max: number): Promise<string[]> {
        const result = this.client.listObjectsV2(this.config.bucket, prefix, true, dir);
        const files: string[] = [];
        let cnt = 0;
        for await (const obj of result) {
            if(cnt >= max){
                break;
            }
            const v = obj as BucketItem;
            if(v.name){
                files.push(v.name);
                cnt++;
            }
        }
        return files;
    }
}

export const NewOssFile = () => {
    const config: OssConfig = {
        accessKey: env.S3_STORAGE_ACCESS_KEY ?? "",
        secretKey: env.S3_STORAGE_SECRET_KEY ?? "",
        bucket: env.S3_STORAGE_BUCKET ?? "",
        region: env.S3_STORAGE_REGION ?? "us-east-1",
        endPoint: env.S3_STORAGE_ENDPOINT ?? "",
        port: env.S3_STORAGE_PORT ?? 9000,
        useSSL: env.S3_STORAGE_SECURE ?? false,
    }
    const key = JSON.stringify(config)
    if (!global_oss_file[key]) {
        global_oss_file[key] = new OssFile(config);
    }
    return global_oss_file[key];
}
