export interface TableListItem {
  personPhoto: [
    {
      picUri: string,
      serverIndexCode: string
    }
  ],
  personId: string,
  personName: string,
  gender: number,
  orgPath: string,
  orgPathName: string,
  orgIndexCode: string,
  orgName: string,
  certificateType: number,
  certificateNo: string,
  updateTime: string,
  birthday: string,
  phoneNo: string,
  address: string,
  email: string,
  education: number,
  nation: number,
  jobNo: string,
  actualPhotoUrl: string
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}

export interface OrganizationDataItem {
  orgIndexCode: string;
  orgNo: string;
  orgName: string;
  orgPath: string;
  parentOrgIndexCode: string;
  parentOrgName: string;
  updateTime: string;
}