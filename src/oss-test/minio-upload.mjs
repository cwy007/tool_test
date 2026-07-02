import 'dotenv/config';
import fs from 'fs';
import * as Minio from 'minio';
import path from 'path';
import {
    dirname
} from 'path';

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
})

async function putStream() {
    try {
        const pathname = dirname(new URL(
            import.meta.url).pathname);
        const filePath = path.join(pathname, 'zao.png');
        const stat = fs.statSync(filePath);
        const stream = fs.createReadStream(filePath);
        const result = await minioClient.putObject(
            'aaa',
            'ccc/ddd/hello2.png',
            stream,
            stat.size, {
                'Content-Type': 'image/png'
            }
        );
        console.log(result);
        console.log('上传成功');
    } catch (err) {
        console.log(err);
    }
}

putStream();

// http://localhost:9000/aaa/ccc/ddd/hello.png
// http://localhost:9000/aaa/ccc/ddd/hello2.png