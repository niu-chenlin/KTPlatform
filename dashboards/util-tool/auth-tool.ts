import {Base64} from "js-base64";
const AUTH_NAME: string = 'TK_AGENT_AUTH';

export interface AuthUser {
    id: string;
    username: string;
    role: number[];
    token: string;
    time: number
}

export class  AuthTool {
    static setAuthInfo(auth: AuthUser) {
        let jsonData = JSON.stringify(auth);
        let base64Data = Base64.encode(jsonData);
        localStorage.setItem(AUTH_NAME, base64Data);
    }
    static getAuthInfo():AuthUser {
        let base64Data = localStorage.getItem(AUTH_NAME);
        let jsonData = Base64.decode(base64Data);
        return JSON.parse(jsonData);
    }
    static clearAuthInfo() {
        localStorage.clear();
    }
    static hasAuthInfo():boolean {
        let hasAuth = localStorage.getItem(AUTH_NAME);
        return !!hasAuth;
    }
}