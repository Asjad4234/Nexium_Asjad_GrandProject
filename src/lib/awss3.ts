import * as https from 'https';
import { Transform as Stream } from 'stream';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
import { UploadReturnType } from '../types';

// Define an interface for the upload parameters
interface UploadToS3Type {
    originalImgLink: string | undefined;
    userId: string | undefined;
    location: string;
}

// Function to process the image from the URL and return it as a stream
export const processImage = (url: string): Promise<StreamingBlobPayloadInputTypes> =>
    new Promise((resolve, reject) => {
        const request = https.request(url, (response) => {
            const data = new Stream();
            response.on('data', (chunk: Buffer) => {
                data.push(chunk);
            });

            response.on('end', () => {
                resolve(data.read());
            });
        });

        request.on('error', (err: string) => {
            reject(err);
        });
        request.end();
    });

// Function to configure the S3 client
export const configureS3 = () => (
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            region: 'us-east-1',
        })
        : null
);


