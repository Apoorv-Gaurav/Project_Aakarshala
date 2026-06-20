'use client'

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]

  // If it is a Cloudinary URL, inject the optimization parameters
  if (src.includes('res.cloudinary.com')) {
    // Cloudinary URLs usually have /upload/ before the actual file path
    const splitUrl = src.split('/upload/')
    if (splitUrl.length === 2) {
      // Prevent double-adding parameters if they somehow already exist
      if (!splitUrl[1].startsWith('f_') && !splitUrl[1].startsWith('v') && !splitUrl[1].includes(',')) {
          // If the URL has a version number right after upload (e.g., /upload/v1234/...), we must put params before the version
          if (splitUrl[1].match(/^v\d+\//)) {
              const versionSplit = splitUrl[1].split(/(^v\d+\/)/);
              return `${splitUrl[0]}/upload/${params.join(',')}/${versionSplit[1]}${versionSplit[2]}`
          }
      } else if (splitUrl[1].match(/^v\d+\//)) {
         const versionSplit = splitUrl[1].split(/(^v\d+\/)/);
         // If there's already a version block, inject params before the version
         return `${splitUrl[0]}/upload/${params.join(',')}/${versionSplit[1]}${versionSplit[2]}`
      }
      
      return `${splitUrl[0]}/upload/${params.join(',')}/${splitUrl[1]}`
    }
  }

  // Fallback for non-cloudinary images or malformed URLs
  return src
}
