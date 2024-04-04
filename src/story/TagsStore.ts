import { makeAutoObservable } from "mobx";
import {
  fetchTags as fetchTagsAPI,
  filterEnum,
  orderEnum,
} from "../services/ApiCommunication";

interface Tag {
  name: string;
  count: number;
}

export enum errorStates {
  TAG_PER_PAGE_NOT_IN_RANGE = "Amount of tags per page must be in range 1-300",
  CONNECTION_ERROR = "Something is wrong with the connection. Try again leter",
}
export const defaultValues = {
  tagsPerPage: 10,
  filter: filterEnum.ALPHABETICALLY,
  dataFrom: "YYYY-MM-DD",
  dataTo: "YYYY-MM-DD",
  orderEnum: orderEnum.growing,
  pattern: ''
};

const tagsState = makeAutoObservable({
  tags: [] as Tag[],
  totalTags: 0,
  isLoading: false,

  // filters values
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

  async fetchTags() {
    this.isLoading = true;
    let tempTagsTab = [] as Tag[];

    try {
      
        if (this.tagsPerPage <= 100 && this.tagsPerPage > 0) {
          const data = await fetchTagsAPI({
            pageNum: this.pageNum,
            tagsPerPage: this.tagsPerPage,
            pattern: this.pattern,
            filter: this.filter,
            dateFrom: this.thisDateFromUnix,
            dateTo: this.thisDateToUnix,
            order: this.order,
          });
          
          tempTagsTab = [...tempTagsTab, ...data.items];
          this.dataDiplayed = true;
          this.totalTags = data.total;
         

        } else if (this.tagsPerPage <= 300 && this.tagsPerPage > 0) {
          const f_num = (this.pageNum - 1) * this.tagsPerPage;
          const startPage = Math.floor(f_num / 100);

          const pagesToGet =
            Math.ceil((this.tagsPerPage * this.pageNum) / 100) - startPage;
          const cutStart = f_num % 100;
          const cutEnd = 100 - ((f_num + this.tagsPerPage) % 100);
          for (let i = startPage; i < startPage + pagesToGet; i++) {
            const data = await fetchTagsAPI({
              pageNum: i + 1,
              tagsPerPage: 100,
              pattern: this.pattern,
              filter: this.filter,
              dateFrom: this.thisDateFromUnix,
              dateTo: this.thisDateToUnix,
              order: this.order,
            });
            tempTagsTab = [...tempTagsTab, ...data.items];
            this.totalTags = data.total;
          }
          tempTagsTab.splice(0, cutStart);
          tempTagsTab.splice(-cutEnd);
          this.dataDiplayed = true;

        } else {
          this.errSwitch = !this.errSwitch;
          this.errorMessage = errorStates.TAG_PER_PAGE_NOT_IN_RANGE;
          this.dataDiplayed = false;
        }
    
      this.amountOfPaginNumbers = Math.ceil(this.totalTags / this.tagsPerPage);
      this.tags = tempTagsTab;
      this.isLoading = false;
    } catch (error) {
      this.errSwitch = !this.errSwitch;
      this.errorMessage = errorStates.CONNECTION_ERROR;
      console.error(error);
      this.isLoading = false;
      this.dataDiplayed = true;
    }
  },
});


export type tagsStoreType = typeof tagsStore;

export const tagsStore = tagsState;
