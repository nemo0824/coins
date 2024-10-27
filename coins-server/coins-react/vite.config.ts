import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 서버 실행 시 자동으로 브라우저를 엽니다.
  },
  build: {
    outDir: 'build', // CRA에서 사용하던 'build' 디렉토리로 빌드합니다.
  },
})