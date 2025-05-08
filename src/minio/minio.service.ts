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

  async upload(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype },
    );
    return await this.minioClient.presignedGetObject(
      this.bucketName,
      fileName,
      24 * 60 * 60,
    );
  }
}
