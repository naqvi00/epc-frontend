import { apiFetch } from "../api/api";

type SignedUploadResponse = {
  timestamp: number;
  signature: string;
  cloudName: string;
  apiKey: string;
  uploadPreset: string;
  folder: string;
};

export async function uploadToCloudinarySigned(
  file: File,
  opts?: {
    folder?: string;
    onProgress?: (pct: number) => void;
  }
): Promise<{ secureUrl: string; publicId: string }> {
  const folder = opts?.folder || "epc/uploads";

  // 1) get signature from backend (admin protected)
  const signed = await apiFetch<SignedUploadResponse>("/api/admin/cloudinary/sign", {
    method: "POST",
    body: JSON.stringify({ folder }),
  });

  // 2) upload to cloudinary (XHR for progress)
  const url = `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`;

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signed.apiKey);
  form.append("timestamp", String(signed.timestamp));
  form.append("signature", signed.signature);
  form.append("upload_preset", signed.uploadPreset);
  form.append("folder", signed.folder);

  const result = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.round((e.loaded / e.total) * 100);
      opts?.onProgress?.(pct);
    };

    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(json);
        else reject(json);
      } catch (err) {
        reject(err);
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.send(form);
  });

  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
  };
}
