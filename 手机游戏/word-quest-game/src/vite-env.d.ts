/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WECHAT_APP_ID?: string;
  readonly VITE_WECHAT_UNIVERSAL_LINK?: string;
  readonly VITE_QQ_APP_ID?: string;
  readonly VITE_ALIPAY_APP_ID?: string;
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
