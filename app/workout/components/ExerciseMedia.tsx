import Image from 'next/image';

interface ExerciseMediaProps {
  videoUrl?: string | null;
  imageUrl?: string | null;
  alt: string;
  className?: string;
}

export function ExerciseMedia({ 
  videoUrl, 
  imageUrl, 
  alt, 
  className = '' 
}: ExerciseMediaProps) {
  // Default placeholder image URL (can be replaced with your own)
  const defaultImageUrl = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // If we have a valid YouTube URL, show the video
  if (videoUrl) {
    const videoId = extractYouTubeId(videoUrl);
    if (videoId) {
      return (
        <div className={`aspect-video bg-gray-100 rounded-lg overflow-hidden ${className}`}>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
            title={alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  }

  // If we have an image URL, show the image
  const effectiveImageUrl = imageUrl || defaultImageUrl;
  
  return (
    <div className={`relative aspect-video bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <Image
        src={effectiveImageUrl}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
