import { parse } from "node-html-parser";
import { IStandardData } from "../src/interfaces/IStandardData";
import contents from "./voter_content";
import HtmlTableToJson from "html-table-to-json";

function getVoterListFromRawHTML(html: string) {
  const dom = parse(html);

  const data = HtmlTableToJson.parse(dom.querySelector("#tbl_data").outerHTML);
  return data.results.flat().map((data) => {
    const [sn, voterId, voterName, age, gender, spouseName, parentsName] =
      Object.values(data);

    const [fatherName, motherName] = (parentsName || "")?.split("/");

    return {
      voterId,
      voterName,
      age,
      gender,
      spouseName,
      fatherName,
      motherName,
    };
  });
}

console.log(getVoterListFromRawHTML(contents));
