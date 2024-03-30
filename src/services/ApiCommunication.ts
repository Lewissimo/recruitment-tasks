import axios from "axios";
import { ApiResponse } from "./types";

export enum filterEnum {
  ALPHABETICALLY = "name",
  POPULAR = "popular",
  ACTIVITY = "activity",
}

export enum orderEnum{
    descending = 'desc',
    growing = 'asc'
}

export const fetchTags = ({
  pageNum,
  tagsPerPage,
  pattern,
  filter,
  dateFrom,
  dateTo,
  order
}: {
  pageNum: number;
  tagsPerPage: number;
  pattern: string;
  filter: string;
  dateFrom: string | null;
  dateTo: string | null;
  order: string;
}): Promise<ApiResponse> => {
    console.log(dateFrom);
    console.log(dateTo);
    console.log(order);
    let request = 'https://api.stackexchange.com/2.2/tags?'
    if (dateFrom) {
        request += `fromdate=${dateFrom}&`;
    }
    if (dateTo) {
        request += `todate=${dateTo}&`;
    }
    request += `order=${order}&sort=${filter}&inname=${pattern}&site=stackoverflow&pagesize=${tagsPerPage}&page=${pageNum}&key=YY)SeZAbwh*D1SHWWAuYOw((&/2.3/filters/create?include=total;items.name;items.count;&unsafe=false&filter=!nNPvSNVZJS`

  return (
    axios
        .get(request)
    //   .get(`Ow((`)&
      .then((response) => {
        console.log(response.data)
        return response.data as ApiResponse;
      })
  );
};
