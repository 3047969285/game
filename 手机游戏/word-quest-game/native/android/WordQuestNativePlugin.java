package com.wordquest.rpg;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * 词场冒险原生桥接插件（骨架代码）
 *
 * 集成步骤：
 * 1. 复制到 android/app/src/main/java/com/wordquest/rpg/
 * 2. 在 MainActivity 注册插件
 * 3. 添加微信 SDK / QQ SDK / 支付宝 SDK 依赖
 * 4. 实现下方 TODO 部分
 */
@CapacitorPlugin(name = "WordQuestNative")
public class WordQuestNativePlugin extends Plugin {

    @PluginMethod
    public void wechatLogin(PluginCall call) {
        // TODO: 调用微信 SDK SendAuth，在回调中 resolve
        // JSObject ret = new JSObject();
        // ret.put("openId", openId);
        // ret.put("nickname", nickname);
        // call.resolve(ret);
        call.reject("请接入微信 SDK");
    }

    @PluginMethod
    public void qqLogin(PluginCall call) {
        // TODO: Tencent.login(...)
        call.reject("请接入 QQ SDK");
    }

    @PluginMethod
    public void wechatPay(PluginCall call) {
        String orderId = call.getString("orderId");
        String prepayId = call.getString("prepayId");
        String sign = call.getString("sign");
        // TODO: WXAPIFactory.createWXAPI(...).sendReq(payReq)
        call.reject("请接入微信支付");
    }

    @PluginMethod
    public void alipay(PluginCall call) {
        String orderInfo = call.getString("orderInfo");
        // TODO: PayTask task = new PayTask(activity); task.payV2(orderInfo, true)
        call.reject("请接入支付宝 SDK");
    }
}
