import { parse } from "node-html-parser";
import { IStandardData } from "../interfaces/IStandardData";
import axios from "axios";
import HtmlTableToJson from "html-table-to-json";

export function getVoterListFromRawHTML(html: string, cb: (item) => any) {
  const dom = parse(html);

  const data = HtmlTableToJson.parse(dom.querySelector("#tbl_data").outerHTML);
  return data.results.flat().map((data) => {
    const [sn, voterId, voterName, age, gender, spouseName, parentsName] =
      Object.values(data);

    const [fatherName, motherName] = (parentsName || "")?.split("/");

    return cb({
      voterId,
      voterName,
      age,
      gender,
      spouseName,
      fatherName,
      motherName,
    });
  });
}

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
