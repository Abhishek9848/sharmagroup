/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_PROXY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
