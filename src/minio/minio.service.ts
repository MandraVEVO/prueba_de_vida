import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';
import { Express } from 'express';

@Injectable()
export class MinioService implements OnModuleInit {
  private minioClient: Minio.Client;
  private readonly bucketName = 'imagenes';

  onModuleInit() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: false,
      accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
      secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
    });
    this.ensureBucket();
  }

  async ensureBucket() {
    const exists = await this.minioClient
      .bucketExists(this.bucketName)
      .catch(() => false);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
    }
  }

  async uploadBase64(
    base64: string,
    filename: string,
    mimetype: string,
  ): Promise<string> {
    const buffer = Buffer.from(base64, 'base64');
    await this.minioClient.putObject(
      this.bucketName,
      filename,
      buffer,
      buffer.length,
      { 'Content-Type': mimetype },
    );
    // Genera una URL firmada válida por 7 días (604800 segundos)
    return await this.minioClient.presignedGetObject(
      this.bucketName,
      filename,
      7 * 24 * 60 * 60,
    );
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype },
    );
    // Genera una URL firmada válida por 7 días (604800 segundos)
    return await this.minioClient.presignedGetObject(
      this.bucketName,
      fileName,
      7 * 24 * 60 * 60,
    );
  }
}
