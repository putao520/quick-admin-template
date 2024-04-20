import axios from "axios";
import * as fs from "fs";
import * as os from "os";
import {generateRandomCode} from "~/utils/model/code";
import {NewOssFile} from "~/server/infrastructure/storage/oss";

export const GetStorageClient = (name: 'oss' | 'cos') => {
    switch (name) {
        case 'oss':
            return NewOssFile();
        case 'cos':
            return null;
        default:
            throw new Error('不支持的存储类型');
    }
}

let global_tmp_cnt = 0;
export const DownloadFile = async (url: string, fileName?: string) => {
    if(!fileName){
        global_tmp_cnt++
        fileName = `${Date.now()}_${global_tmp_cnt}_${generateRandomCode(12)}.tmp`;
    }
    const path = `${os.tmpdir()}/${fileName}`;
    const res = await axios.get(url,{
        responseType: 'stream' // 指定响应数据类型为arraybuffer
    })
    const stream = res.data as fs.ReadStream
    stream.pipe(fs.createWriteStream(path));
    return fileName
}
