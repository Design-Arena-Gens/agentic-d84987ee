import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';
import { connectToDatabase } from '@/lib/db';
import Media from '@/models/Media';

async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(req: Request) {
  if (!cloudinary.config().cloud_name) {
    return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });
  }
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const buffer = await fileToBuffer(file);

  const upload = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(buffer);
  });

  await connectToDatabase();
  await Media.findOneAndUpdate(
    { publicId: upload.public_id },
    {
      $set: {
        publicId: upload.public_id,
        url: upload.secure_url,
        format: upload.format,
        width: upload.width,
        height: upload.height,
        bytes: upload.bytes,
      }
    },
    { upsert: true, new: true }
  );

  return NextResponse.redirect(new URL('/admin', req.url));
}
