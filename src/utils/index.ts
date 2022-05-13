import { parse } from "node-html-parser";
import { IStandardData } from "../interfaces/IStandardData";
import axios from "axios";

export function transformHTMLOptionsToStandardData(
  html: string
): IStandardData[] {
  const dom = parse(html);

  return dom.childNodes
    .map((child) => ({
      name: child.innerText,
      //@ts-ignore
      code: child.attributes.value as string,
    }))
    .filter((item) => item.code);
}

export function standardAPICall(api: string, payload: {}) {
  return axios.post(api, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
