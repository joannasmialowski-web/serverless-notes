# Serverless Notes

Lightweight serverless API for creating and listing notes on AWS using Lambda,
HTTP API Gateway, and DynamoDB. Built with TypeScript/Node.js 20 and bundled
via esbuild.

## Architecture (diagram)

```
[Client] -> [API Gateway HTTP API] -> [Lambda (handler.ts)] -> [DynamoDB table]
```

## API examples

- `POST /notes`
  - Request JSON:
    ```json
    { "text": "Buy milk" }
    ```
  - Response `201`:
    ```json
    {
      "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "text": "Buy milk",
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
    ```

- `GET /notes`
  - Response `200`:
    ```json
    {
      "items": [
        {
          "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
          "text": "Buy milk",
          "createdAt": "2024-01-01T12:00:00.000Z"
        }
      ]
    }
    ```

## Deploy

Prerequisites: AWS credentials configured; SAM CLI installed.

1) Build:
   ```
   sam build
   ```
2) Deploy (guided the first time):
   ```
   sam deploy --guided
   ```
   On subsequent deploys you can run:
   ```
   sam deploy
   ```

SAM creates the DynamoDB table and wires the `NOTES_TABLE` environment
variable for the Lambda function.

