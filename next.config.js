/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14+ 已經預設支援 App Router，不需要 experimental.appDir
  webpack: (config, { isServer }) => {
    // 支援載入 GLTF/GLB 3D 模型檔案
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    });

    // 支援載入 Spine 動畫檔案  
    config.module.rules.push({
      test: /\.(json|atlas|png)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/spine/',
          outputPath: 'static/spine/',
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig; 