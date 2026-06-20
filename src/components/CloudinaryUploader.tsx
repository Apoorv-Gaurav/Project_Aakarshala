'use client';

import React, { useState, useRef } from 'react';
import { useField, useFormFields } from '@payloadcms/ui';
import Image from 'next/image';

export const CloudinaryUploader: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get the title from the form to use as the Cloudinary folder name
  const titleField = useFormFields(([fields]) => fields.title);
  const projectName = titleField?.value ? String(titleField.value) : 'Uncategorized';

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    
    // Sanitize the project name for the folder path
    const sanitizedName = projectName.replace(/[^a-zA-Z0-9 -]/g, '').trim() || 'Uncategorized';
    formData.append('folder', `Projects/${sanitizedName}`);

    try {
      const response = await fetch('/api/cloudinary-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Save the Cloudinary URL to the text field
      setValue(data.url);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred during upload');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setValue('');
  };

  return (
    <div className="field-type" style={{ marginBottom: '20px' }}>
      <label className="field-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
        Cloudinary Image ({path})
      </label>
      
      {value ? (
        <div style={{ position: 'relative', width: '200px', height: '150px', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ccc' }}>
          <Image src={value} alt="Uploaded preview" fill sizes="200px" style={{ objectFit: 'cover' }} />
          <button 
            type="button" 
            onClick={handleRemove}
            style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
          >
            Remove
          </button>
        </div>
      ) : (
        <div style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center', background: '#f9f9f9', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
          {isUploading ? (
            <p style={{ margin: 0 }}>Uploading to Cloudinary...</p>
          ) : (
            <p style={{ margin: 0, color: '#666' }}>Click to select and upload an image</p>
          )}
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        accept="image/*" 
        style={{ display: 'none' }} 
        disabled={isUploading}
      />

      {error && <p style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>{error}</p>}
      
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>
        URL: {value || 'None'}
      </p>
    </div>
  );
};
