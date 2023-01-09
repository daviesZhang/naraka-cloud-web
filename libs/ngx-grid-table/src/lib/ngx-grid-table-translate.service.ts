import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NgxGridTableTranslateService {


    private text: { [key: string]: string } = {};

    /**
     * 设置国际化 key-文本 映射对象
     * @param localText
     */
    setI18nText(localText: { [key: string]: string }) {
        this.text = !localText ? {} : localText;
    }


    /**
     * 翻译方法
     * @param key
     * @param value  参数
     * @param defaultText 默认值，如果没有匹配到key又没有默认值则返回key本身
     */
    translate(key: string, value?: { [key:string]:any }, defaultText?: string):string {
        const text = this.text[key];
        if (!text) {
            return defaultText ? defaultText : key;
        }
        if (!value) {
            return text;
        }
        Object.keys(value).forEach(name => {
            text.replace(`{{${name}}}`, value[name]);
        });
        return text;
    }
}
