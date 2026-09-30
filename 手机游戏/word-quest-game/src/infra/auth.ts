export type AuthProvider = "qq" | "wechat";

export interface AuthConfig {
  qqUrl: string;
  wechatUrl: string;
}

/**
 * 前端只保存 OAuth 发起地址，不保存 QQ/微信 AppSecret。
 * 地址由部署环境注入，真实换取 code/token 必须发生在后端。
 */
export function getAuthConfig(): AuthConfig {
  return {
    qqUrl: import.meta.env.VITE_QQ_AUTH_URL ?? "",
    wechatUrl: import.meta.env.VITE_WECHAT_AUTH_URL ?? "",
  };
}

export function authUrl(provider: AuthProvider): string {
  const config = getAuthConfig();
  return provider === "qq" ? config.qqUrl : config.wechatUrl;
}
