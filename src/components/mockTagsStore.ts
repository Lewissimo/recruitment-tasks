import { makeAutoObservable } from "mobx";
import { filterEnum, orderEnum } from "../services/ApiCommunication";
import { defaultValues } from "../story/TagsStore";
import { Tag } from "../services/types";


const randomTags: Tag[] = [
    {
        name: 'arandom1',
        count: 23,
    },
    {
        name: 'arandom2',
        count: 43,
    },
    {
        name: 'brandom3',
        count: 23,
    },
    {
        name: 'brandom4',
        count: 66,
    },
    {
        name: 'crandom5',
        count: 75,
    },
    {
        name: 'crandom5',
        count: 455,
    },
    {
        name: 'drandom6',
        count: 3,
    },
    {
        name: 'drandom6',
        count: 21,
    },
]
export const mockTagsStore = makeAutoObservable({
    tags: randomTags,
    totalTags: 10,
    isLoading: false,
  
    pageNum: 1,
    valuesChanged: false,
    tagsPerPage: defaultValues.tagsPerPage,
    amountOfPaginNumbers: undefined as number | undefined,
    filter: defaultValues.filter,
    pattern: "",
    dateFrom: "YYYY-MM-DD",
    dateTo: "YYYY-MM-DD",
    thisDateFromUnix: null as string | null,
    thisDateToUnix: null as string | null,
    order: orderEnum.growing,
  
    dataDiplayed: false,
    errorMessage: "",
    errSwitch: false,
  checkIsValuesChanged() {
    if (
      this.pattern !== defaultValues.pattern ||
      this.tagsPerPage !== defaultValues.tagsPerPage ||
      this.filter !== defaultValues.filter ||
      this.dateFrom !== defaultValues.dataFrom ||
      this.dateTo !== defaultValues.dataTo ||
      this.order !== defaultValues.orderEnum
    ) {
      this.valuesChanged = true;
    } else {
      this.valuesChanged = false;
    }
  },
  setErrorMessage(errorMessage: string) {
    this.errorMessage = errorMessage;
  },

  async fetchTags() {
    alert('fetching tags')
  },

  setParams({
    pageNum,
    tagsPerPage,
    pattern,
    filter,
    dateFrom,
    dateTo,
    order,
  }: {
    pageNum: number;
    tagsPerPage: number;
    pattern: string;
    filter: filterEnum;
    dateFrom: string;
    dateTo: string;
    order: orderEnum;
  }) {
    
    if (dateFrom !== "YYYY-MM-DD") {
        const dateFromObject = new Date(dateFrom);
        const fromDateUnix = Math.floor(
          dateFromObject.getTime() / 1000
        ).toString();
        this.thisDateFromUnix = fromDateUnix;
      }
      if (dateTo !== "YYYY-MM-DD") {
        const dateToObject = new Date(dateTo);
        const toDateUnix = Math.floor(dateToObject.getTime() / 1000).toString();
        this.thisDateToUnix = toDateUnix;
      }
  
      pageNum > 0 && (this.pageNum = pageNum);
      this.tagsPerPage = tagsPerPage;
      this.pattern = pattern;
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.filter = filter;
      this.order = order;
      this.checkIsValuesChanged();



    },

});
