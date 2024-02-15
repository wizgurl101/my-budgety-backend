import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import dotenv from "dotenv";

// type SecretResponse = {};

export async function getSecret(secretName: string) {
  const client = new SecretManagerServiceClient();

  try {
    const [version] = await client.accessSecretVersion({
      name: `${secretName}/versions/latest`,
    });

    const payload = version.payload.data.toString();
    console.log(`Test Payload: ${payload}`);
  } catch (error) {
    console.error("Error accessing secret version", error);
    console.log("The secret was not found.");
  }
}
