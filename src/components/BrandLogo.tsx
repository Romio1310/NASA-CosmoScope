interface BrandLogoProps {
  className?: string;
  size?: number;
}

export default function BrandLogo({ className = "", size = 32 }: BrandLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* Background Circle */}
      <circle cx="16" cy="16" r="16" fill="url(#logoGradient)"/>
      
      {/* Rocket Body */}
      <path d="M16 6L18.5 10L18.5 20L16 25L13.5 20L13.5 10Z" fill="white"/>
      
      {/* Rocket Fins */}
      <path d="M13.5 18L10 21L13.5 22Z" fill="white" fillOpacity="0.9"/>
      <path d="M18.5 18L22 21L18.5 22Z" fill="white" fillOpacity="0.9"/>
      
      {/* Rocket Window */}
      <ellipse cx="16" cy="12" rx="1.5" ry="2" fill="#3b82f6"/>
      
      {/* Rocket Details */}
      <rect x="15" y="14" width="2" height="4" fill="#22d3ee" fillOpacity="0.7"/>
    </svg>
  );
}