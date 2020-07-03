import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import { Link, useIntl, ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';

import CreateForm from './components/CreateForm';
import { TableListItem } from './data.d';
import { queryPersonnel, queryOrganization } from './service';

export interface OrganizationDataItem {
  orgIndexCode: string;
  orgNo: string;
  orgName: string;
  orgPath: string;
  parentOrgIndexCode: string;
  parentOrgName: string;
  updateTime: string;
}

export interface OrganizationListData {
  list: OrganizationDataItem[]
}

const organizationDataRender = (organizationList: OrganizationDataItem[]): OrganizationDataItem[] =>
  organizationList.map((item) => {
    debugger
    return item as OrganizationDataItem;
  });

const TableList: React.FC<{}> = () => {
  useEffect(() => {
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }
    // async function getOrganization() {
    //   const response = await queryOrganization();
    //   setOrganizationData(response);
    // }
    // getOrganization()
    // 从服务器获取组织机构
    queryOrganization().then(data => {
      let oData = data
      console.log(oData)
      setOrganizationData([...oData] || []);
      // 从服务器获取人员
      let parameters = {
        personName: '',
        orgIndexCodes: oData[0].orgIndexCode,
        pageNo: 1,
        pageSize: 12,
        isSubOrg: true
      }
      queryPersonnel(parameters).then(data => {
        let tableData = data.list
        console.log(tableData)
        setTableData(tableData || []);
      })
    })

    if(oData.length){
      debugger
    }
    
  }, []);

  const [oData, setOrganizationData] = useState<OrganizationDataItem[]>([]);
  console.log("----" + typeof(oData), oData)
  const [tableData, setTableData] = useState([]);
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'personName',
      rules: [
        {
          required: true,
          message: '姓名为必填项',
        },
      ],
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '年龄',
      dataIndex: 'birthday',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: '工号',
      dataIndex: 'jobNo',
      valueType: 'textarea',
    },
    {
      title: '工种',
      dataIndex: 'certificateType',
      valueType: 'textarea',
    },
    {
      title: '联系方式',
      dataIndex: 'address',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '所属企业',
      dataIndex: 'orgName',
      valueType: 'textarea',
    },
    {
      title: '人员状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    // {
    //   title: '上次调度时间',
    //   dataIndex: 'updatedAt',
    //   sorter: true,
    //   valueType: 'dateTime',
    //   hideInForm: true,
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     const status = form.getFieldValue('status');
    //     if (`${status}` === '0') {
    //       return false;
    //     }
    //     if (`${status}` === '3') {
    //       return <Input {...rest} placeholder="请输入异常原因！" />;
    //     }
    //     return defaultRender(item);
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];
  return (
    <div style={{display: 'flex'}}>
      <div>
        <ul>
          {oData.map(item => (
            <li key={item.orgName}>
              {item.orgName}
            </li>
          ))}
        </ul>
      </div>
      <PageHeaderWrapper>
        <ProTable<TableListItem>
          headerTitle="查询表格"
          actionRef={actionRef}
          rowKey="key"
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<TableListItem>;
            if (sorterResult.field) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            }
          }}
          params={{
            personName: '',
            orgIndexCodes: '123',
            pageNo: 1,
            pageSize: 12,
            isSubOrg: true
          }}
          toolBarRender={(action, { selectedRows }) => [
          ]}
          tableAlertRender={({ selectedRowKeys, selectedRows }) => (
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          )}
          request={(params) => queryPersonnel(params)}
          columns={columns}
          rowSelection={{}}
        />
        <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
          <ProTable<TableListItem, TableListItem>
            rowKey="key"
            type="form"
            columns={columns}
            rowSelection={{}}
          />
        </CreateForm>
      </PageHeaderWrapper>
    </div>
  );
};

// export default TableList;
export default connect(({ settings }: ConnectState) => ({ ...settings }))(TableList);
