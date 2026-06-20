import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // Authenticate using Payload
    const payload = await getPayload({ config: configPromise });
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'Projects/Uncategorized';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise<NextResponse>((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve(NextResponse.json({ error: error.message }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ url: result?.secure_url }, { status: 200 }));
          }
        }
      );

      uploadStream.end(bytes);
    });
  } catch (error: unknown) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
