import Image, { type ImageProps } from 'next/image'

import imageLoader from 'src/types/image/loader'

type OptimizedImageProps = Omit<ImageProps, 'loader'> & {
  /**
   * Some assets (e.g. remote full URLs) are already optimized.
   * Set to true to fallback to Next.js default loader.
   */
  disableCustomLoader?: boolean
}

const OptimizedImage = ({
  disableCustomLoader = false,
  alt = '',
  ...props
}: OptimizedImageProps) => {
  const loaderProps = disableCustomLoader ? {} : { loader: imageLoader }

  return <Image alt={alt} {...loaderProps} {...props} />
}

export default OptimizedImage
