import React from 'react';
import { FaUser } from "react-icons/fa";

interface AvatarProps {
  src: string;
  name: string;
  size?: 'small' | 'medium' | 'large';
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  name,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-16 w-16',
  };
  

  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={`${name}'s avatar`}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-blue-100 dark:bg-blue-800">
          <FaUser className="h-1/2 w-1/2 text-blue-500 dark:text-blue-300" />
        </div>
      )}
    </div>
  );
};