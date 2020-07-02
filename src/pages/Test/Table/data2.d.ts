export interface PersonnelItem {
  id: number;
  title: string;
  published_at: string;
  playlist_name: string;
  is_paid: boolean;
  weight: number;
  time: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface PersonnelListData {
  personnels: PersonnelItem[];
  page: Partial<TableListPagination>;
}

interface MovieUpdateParams {
  weight: number;
  time: string;
  id: number;
  title: string;
}

export interface TableListParams {
  sorter: string;
  page: number;
  q: {
    title_cont: string;
  };
  personnel: MovieUpdateParams;
}