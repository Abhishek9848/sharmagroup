// components/FullScreenLoader.tsx
"use client";

import { HashLoader } from "react-spinners";

type FullScreenLoaderProps = {
  loading?: boolean;
  color?: string;
  size?: number;
};

const FullScreenLoader = ({ loading = true, color = "#4F46E5", size = 80 }: FullScreenLoaderProps) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <HashLoader color={color} size={size} />
    </div>
  );
};

export default FullScreenLoader;
