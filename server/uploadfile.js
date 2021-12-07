import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "process";
import { getDefaultRoleAssumerWithWebIdentity, } from "@aws-sdk/client-sts";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
require("dotenv").config();
const credentialProvider = defaultProvider({
    roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(),
});
const client = new S3Client({
    region: env.REGION,
    apiVersion: "latest",
    credentials: credentialProvider,
});
const command = new PutObjectCommand({
    Bucket: "s3testbucketforgiang",
    Key: "test-file",
    Body: "This is a test upload from NodeJS",
});
client.send(command);
client.destroy();
//# sourceMappingURL=uploadfile.js.map