import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

type SecretResponse = {
  value: string;
};

export async function getSecret(secretName: string): Promise<SecretResponse> {
  const client = new SecretManagerServiceClient();

  try {
    const [version] = await client.accessSecretVersion({
      name: `${secretName}/versions/latest`,
    });

    const payload = version.payload.data.toString();
    return { value: payload };
  } catch (error) {
    console.error("Error accessing secret version", error);
    return { value: "" };
  }
}
