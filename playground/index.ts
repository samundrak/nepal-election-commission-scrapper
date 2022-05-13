import { parse } from "node-html-parser";
import { IStandardData } from "../src/interfaces/IStandardData";

function transformHTMLOptionsToStandardData(html: string): IStandardData[] {
  const dom = parse(html);

  return dom.childNodes
    .map((child) => ({
      name: child.innerText,
      //@ts-ignore
      code: child.attributes.value as string,
    }))
    .filter((item) => item.code);
}

// console.log(transformHTMLOptionsToStandardData(string));
