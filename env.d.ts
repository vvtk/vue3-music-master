/// <reference types="vite/client" />
interface Window {
    MusicApp:Object,
    MusicApp: {
        Close:any;
    }; //注意这里如果不写any那么用window.gdp是可以的，但是用window.gdp.a就会报错
  }
  interface ImportMetaEnv {
    readonly NODE_ENV: string
    // 更多环境变量...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }