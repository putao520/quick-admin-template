declare module 'mock-aws-s3' {
  import type { Request } from 'aws-sdk'

  interface UploadParams {
    Bucket: string
    Key: string
    Body: NodeJS.ReadableStream | Buffer | string
  }

  interface UploadResult {
    Location: string
    ETag: string
    Bucket: string
    Key: string
  }

  interface GetObjectParams {
    Bucket: string
    Key: string
  }

  interface GetObjectResult {
    Body?: Buffer | string
  }

  interface ListObjectsV2Params {
    Bucket: string
    Prefix?: string
  }

  interface ListObjectsV2Result {
    Contents?: Array<{ Key?: string }>
  }

  interface DeleteObjectParams {
    Bucket: string
    Key: string
  }

  interface DeleteObjectsParams {
    Bucket: string
    Delete: { Objects: Array<{ Key: string }> }
  }

  namespace AWSMock {
    interface S3Config {
      params?: { Bucket?: string }
    }

    class S3 {
      constructor(config?: S3Config)

      upload(params: UploadParams): Request<UploadResult, Error>
      putObject(params: UploadParams): Request<UploadResult, Error>
      getObject(params: GetObjectParams): Request<GetObjectResult, Error>
      listObjectsV2(params: ListObjectsV2Params): Request<ListObjectsV2Result, Error>
      deleteObject(params: DeleteObjectParams): Request<unknown, Error>
      deleteObjects(params: DeleteObjectsParams): Request<unknown, Error>
      createBucket(params: { Bucket: string }): Request<unknown, Error>
    }

    const config: {
      basePath?: string
    }
  }

  export = AWSMock
}
