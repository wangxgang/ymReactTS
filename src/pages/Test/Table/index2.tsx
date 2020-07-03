import {
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  message,
  Tag,
} from 'antd';
import React, { Component, Fragment } from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
// import { ConnectState, PersonnelModelState } from '@/models/connect';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table/interface';
import PersonnelTable, { PersonnelTableColumnProps } from './components/PersonnelTable';
import { divide } from 'lodash';
import { PersonnelItem, TableListPagination, TableListParams } from './data2.d';
import { Link } from 'umi';
import { truncateString } from '@/utils/utils';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

export interface PersonnelProps {
  dispatch: Dispatch<Action<'personnels/add' | 'personnels/fetch' | 'personnels/remove' | 'personnels/update'>>;
  loading: boolean;
  personnels: StateType;
}
 
export interface PersonnelState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  selectedRows: PersonnelItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<PersonnelItem>;
  errorMessage?: string;
}

class Personnel extends Component<PersonnelProps, PersonnelState> {
  constructor(props: PersonnelProps) {
    super(props);
    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
    };
  }

  columns: PersonnelTableColumnProps[] = [
    {
      title: '编号',
      dataIndex: 'id',
      render: (id: number) => <Link to={`/admin/movies/${id}`}>{id}</Link>,
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (val: string, record: PersonnelItem) => (
        <Link to={`/admin/movies/${record.id}`}>{truncateString(val, 30)}</Link>
      ),
    },
    {
      title: '课程',
      dataIndex: 'playlist_name',
      render: (val: string) => truncateString(val, 30),
    },
    {
      title: '是否付费',
      dataIndex: 'is_paid',
      render: (val: boolean) => <Tag color={val ? 'green' : 'red'}>{val ? '是' : '否'}</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'published_at',
    },
    {
      title: '操作',
      render: (_, record: PersonnelItem) => (
        <Fragment>
          {/* <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a> */}
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    debugger
    dispatch({
      type: 'personnels/fetch',
    });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof PersonnelItem, string[]>,
    sorter: SorterResult<PersonnelItem>,
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      // newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      page: pagination.current,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    debugger
    dispatch({
      type: 'personnels/fetch',
      payload: params,
    });
  };

  handleSelectRows = (rows: PersonnelItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  render() {
    console.log(this) 
    debugger
    const {
      personnels: { data },
      loading,
    } = this.props;
    debugger
    const {
      selectedRows,
      modalVisible,
      updateModalVisible,
      stepFormValues,
      errorMessage,
    } = this.state;

    return (
      <PageHeaderWrapper>
        <div>
          <PersonnelTable
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            // onChange={this.handleStandardTableChange}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
 
export default Personnel;