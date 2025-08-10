import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // 从GitHub仓库名称中提取
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '');
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig: NextConfig = {
  output: 'export',  // 静态导出
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true,  // 对于静态导出，需要禁用图像优化
  },
};

export default nextConfig;