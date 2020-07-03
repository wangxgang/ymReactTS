import React, { Component, Fragment } from 'react';
import { ColumnProps, TableProps } from 'antd/es/table';
import { Table } from 'antd';

import { PersonnelItem } from '../data.d';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface PersonnelTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: PersonnelTableColumnProps[];
  data: {
    personnels: PersonnelItem[];
    page: PersonnelTableProps<PersonnelItem>['pagination'];
  };
  selectedRows: PersonnelItem[];
  onSelectRow: (rows: any) => void;
}

export interface PersonnelTableColumnProps extends ColumnProps<PersonnelItem> {
  needTotal?: boolean;
  total?: number;
}

function initTotalList(columns: PersonnelTableColumnProps[]) {
  if (!columns) {
    return [];
  }
  const totalList: PersonnelTableColumnProps[] = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}
 
export interface PersonnelState {
  selectedRowKeys: string[];
  // needTotalList: PersonnelTableColumnProps[];
}
 
class PersonnelTable extends Component<PersonnelTableProps<PersonnelItem>, PersonnelState> {
  static getDerivedStateFromProps(nextProps: PersonnelTableProps<PersonnelItem>) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      // const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        // needTotalList,
      };
    }
    return null;
  }

  constructor(props: PersonnelTableProps<PersonnelItem>) {
    super(props);
    const { columns } = props;
    this.state = {
      selectedRowKeys: [],
      // needTotalList,
    };
  }

  // handleRowSelectChange: TableRowSelection<PersonnelItem>['onChange'] = (
  //   selectedRowKeys,
  //   selectedRows: PersonnelItem[],
  // ) => {
  //   const currySelectedRowKeys = selectedRowKeys as string[];
  //   let { needTotalList } = this.state;
  //   needTotalList = needTotalList.map(item => ({
  //     ...item,
  //     total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex || 0]), 0),
  //   }));
  //   const { onSelectRow } = this.props;
  //   if (onSelectRow) {
  //     onSelectRow(selectedRows);
  //   }

  //   this.setState({ selectedRowKeys: currySelectedRowKeys, needTotalList });
  // };

  handleTableChange: TableProps<PersonnelItem>['onChange'] = (pagination, filters, sorter, ...rest) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  render() {
    // const { selectedRowKeys, needTotalList } = this.state; 
    const { selectedRowKeys } = this.state; 
    const { data, rowKey, ...rest } = this.props;
    const { personnels = [], page = false } = data || {};

    const paginationProps = page
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          current: (page as any).current_page,
          pageSize: (page as any).limit_value,
          total: (page as any).total_count,
        }
      : false;

    // const rowSelection: TableRowSelection<PersonnelItem> = {
    //   selectedRowKeys,
    //   // onChange: this.handleRowSelectChange,
    // };

    return (
      <Table
        rowKey={rowKey || 'id'}
        // rowSelection={rowSelection}
        dataSource={personnels}
        pagination={paginationProps}
        onChange={this.handleTableChange}
        {...rest}
      />
    );
  }
}
 
export default PersonnelTable;