import { AxiosResponse } from "axios";
import { ResponseType} from "../types/ResponseTypes.ts";
import * as React from "react";
import axios from "axios";
import {API_URL} from "../Consts.ts";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export abstract class BaseComponent<P, S> extends React.PureComponent<P, S>{

    protected async postToApi<T, D>(path: string, data: D, header: object | null = null): Promise<AxiosResponse<ResponseType<T>>> {
        const headers = {
            "Content-Type": "application/json",
            ...header,
        }
        return await axios.post<ResponseType<T>>(`${API_URL}${path}`, data, {headers})
    }

    protected async getFromApi<T>(path: string, header: object | null = null): Promise<AxiosResponse<ResponseType<T>>> {
        const headers = {
            ...header,
        }
        return await axios.get<ResponseType<T>>(`${API_URL}${path}`, {headers})
    }

    protected async getFingerprint(){
        const fp = await FingerprintJS.load();
        return await fp.get();
    }

}