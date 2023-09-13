/// <reference types="vite/client" />
interface Window {
    MusicApp:Object,
    MusicApp: {
        Close:any;
    }; //注意这里如果不写any那么用window.gdp是可以的，但是用window.gdp.a就会报错
  }