import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");

    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const ext = file.name.split(".").slice(-1);
    console.log({ ext });
    // s3Client.send(
    //   PutObjectCommand({
    //     Bucket: "jacob-food-ordering",
    //     key: "",
    //   })
    // );
  }
  return Response.json(true);
}
