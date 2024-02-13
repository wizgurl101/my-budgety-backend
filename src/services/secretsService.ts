import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

export async function accessSecretVersion() {
  const client = new SecretManagerServiceClient();

  const [version] = await client.accessSecretVersion({
    name: "projects/my-project/secrets/my-secret/versions/latest",
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();
}
