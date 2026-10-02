import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import eslintPlugin from "vite-plugin-eslint";

// GitHub Pages only serves files that exist, so give each route its own copy of the page
const languageRoutes = () => {
    let outDir;
    return {
        name: 'language-routes',
        apply: 'build',
        configResolved(config) {
            outDir = path.resolve(config.root, config.build.outDir);
        },
        closeBundle() {
            for (const route of ['en', 'es', 'en/funny', 'es/funny']) {
                fs.mkdirSync(path.join(outDir, route), {recursive: true});
                fs.copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, route, 'index.html'));
            }
        },
    };
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), eslintPlugin(), languageRoutes()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    }
})
