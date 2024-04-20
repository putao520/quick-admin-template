export default function imageLoader({src, width, quality}: { src: string, width?: number, quality?: number }) {
    const p = process.env.NEXT_PUBLIC_RESOURCES_URL
    if (src.startsWith("http")) return `${src}?${width ? `w=${width}&` : ""}q=${quality ?? 75}`
    return p ? `${p}/${src}` : `${src}?${width ? `w=${width}&` : ""}q=${quality ?? 75}`
}
