/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  async rewrites() {
    return [
      {
        source: '/upload/:slug',
        destination: 'http://localhost:9090/upload/:slug',
      },
    ];
  },
};

module.exports = nextConfig;

/**
 * output: 'export'
 *
 * next의 2가지 배포 모드 중 하나인 static모드로 설정하는 코드
 * 설정을 하지 않으면 dynamic 모드임
 *
 * static모드 : next 서버 없이 HTML 페이지들로만 구성된 정적인 사이트
 *              build시 모든 것이 결정되기 때문에 서버가 필요없음
 *
 * 그 외 거의 모든 프로젝트는 dynamic 모드로 해야한다.
 */
