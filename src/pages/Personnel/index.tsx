import { CarryOutOutlined, FormOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Divider, Tree, Space, Menu, message, Input, Table, Modal, Tabs, Form } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
// import { SorterResult } from 'antd/es/table/interface';
// import { Link, useIntl, ConnectProps, connect } from 'umi';
// import { ConnectState } from '@/models/connect';

import PersonnelTree from './components/PersonnelTree';
import { TableListItem, OrganizationDataItem, TableListParams } from './data.d';
import { queryPersonnel, queryOrganization, queryPersonnelDetails } from './service';
import styles from './personnel.less';

const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function PersonnelDetail(v) {
  const divSyle = { display: 'flex', justifyContent: 'space-around' }
  const onFinish = (values: any) => {
    console.log(values);
  };
  console.log(v)
  useEffect(() => {
    // 从服务器获取组织机构
    queryPersonnelDetails(v.value).then(data => {
      console.log("personnelDetail",data)
      setPersonnelDetail(data)
    })
  }, []);
  const [personnelDetail, setPersonnelDetail] = useState({});
  return (
    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'name']} label="姓名" rules={[{ required: true }]}>
          <Input value={personnelDetail.personName} placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'email']} label="年龄" rules={[{ required: true }]}>
          <Input placeholder='请输入年龄' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'age']} label="工号" rules={[{ required: true }]}>
          <Input placeholder='请输入工号' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'introduction']} label="身份证号" rules={[{ required: true }]}>
          <Input placeholder='请输入身份证' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="工种" rules={[{ required: true }]}>
          <Input placeholder='请输入工种' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="联系方式" rules={[{ required: true }]}>
          <Input placeholder='请输入联系方式' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="所属企业" rules={[{ required: true }]}>
          <Input placeholder='请输入企业' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="所属部门" rules={[{ required: true }]}>
          <Input placeholder='请输入部门' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'introduction']} label="人员类型" rules={[{ required: true }]}>
          <Input placeholder='请输入人员类型' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'introduction']} label="权限组" rules={[{ required: true }]}>
          <Input placeholder='请输入权限组' />
        </Form.Item>
      </div>
    </Form>
  ); 
}

const DemoFrom = (res: any) => {
  console.log(res)
  const name = res && res.personName
  const onFinish = (values: any) => {
    console.log(values);
  };

  const divSyle = { display: 'flex', justifyContent: 'space-around' }

  console.log(name)
  return (
    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'name']} label="姓名" rules={[{ required: true }]}>
          <Input defaultValue={name} placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'email']} label="年龄" rules={[{ required: true }]}>
          <Input placeholder='请输入年龄' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'age']} label="工号" rules={[{ required: true }]}>
          <Input placeholder='请输入工号' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'introduction']} label="身份证号" rules={[{ required: true }]}>
          <Input placeholder='请输入身份证' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="工种" rules={[{ required: true }]}>
          <Input placeholder='请输入工种' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="联系方式" rules={[{ required: true }]}>
          <Input placeholder='请输入联系方式' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="所属企业" rules={[{ required: true }]}>
          <Input placeholder='请输入企业' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'website']} label="所属部门" rules={[{ required: true }]}>
          <Input placeholder='请输入部门' />
        </Form.Item>
      </div>
      <div style={divSyle}>
        <Form.Item className={styles.labelstyle} name={['user', 'introduction']} label="人员类型" rules={[{ required: true }]}>
          <Input placeholder='请输入人员类型' />
        </Form.Item>
        <Form.Item className={styles.labelstyle} name={['user', 'introduction']} label="权限组" rules={[{ required: true }]}>
          <Input placeholder='请输入权限组' />
        </Form.Item>
      </div>
    </Form>
  );
};

const organizationDataRender = (organizationList: OrganizationDataItem[]): OrganizationDataItem[] =>
  organizationList.map((item) => {
    return item as OrganizationDataItem;
  });

function callback(key: any) {
  console.log(key);
}

const treeArray = [
  {
    id: 1,
    name: '食品',
    parentId: 0
  },
  {
    id: 2,
    name: '水果',
    parentId: 1
  },
  {
    id: 3,
    name: '香蕉',
    parentId: 2
  },
  {
    id: 4,
    name: '苹果',
    parentId: 2
  },
  {
    id: 5,
    name: '零食',
    parentId: 1
  },
  {
    id: 6,
    name: '休闲零食',
    parentId: 5
  },
  {
    id: 7,
    name: '辣条',
    parentId: 6
  },
  {
    id: 8,
    name: '香肠',
    parentId: 6
  },
  {
    id: 9,
    name: '儿童零食',
    parentId: 5
  },
  {
    id: 10,
    name: '3-5岁',
    parentId: 9
  },
  {
    id: 11,
    name: '好多鱼',
    parentId: 10
  },
  {
    id: 12,
    name: '6-10岁',
    parentId: 9
  },
  {
    id: 13,
    name: '奶酪棒',
    parentId: 9
  },
  {
    id: 14,
    name: '牛奶蛋糕',
    parentId: 9
  }
]

const Demo = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="基本信息" key="1">
      {DemoFrom()}
    </TabPane>
    <TabPane tab="持证资质" key="2">
      Content of Tab Pane 2
      </TabPane>
    <TabPane tab="考勤统计" key="3">
      Content of Tab Pane 3
      </TabPane>
    <TabPane tab="违章记录" key="4">
      Content of Tab Pane 4
      </TabPane>
    <TabPane tab="培训记录" key="5">
      Content of Tab Pane 5
      </TabPane>
  </Tabs>
);

const columns2 = [
  {
    title: '姓名',
    dataIndex: 'personName',
    key: '1'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: '2'
  },
  {
    title: '工号',
    dataIndex: 'jobNo',
    key: '3'
  },
  {
    title: '默认组织',
    dataIndex: 'orgPathName',
    key: '4'
  },
  {
    title: '联系电话',
    dataIndex: 'phoneNo',
    key: '5'
  },
  {
    title: '所属组织名称',
    dataIndex: 'orgName',
    key: '6'
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <App id={record.personId}>查看详情</App>
        {/* <a onClick={e => seeDetail(record.orgIndexCode)}>查看详情</a> */}
        {/* <a onClick={e => seeDetail(record.personId)}>查看详情</a> */}
      </Space>

    ),
  }
];

// function queryPersonnelList(parameters: TableListParams) {
//   queryPersonnel(parameters).then(data => {
//     let datas: OrganizationDataItem[] = data.list
//     datas.map(item => {
//       item.key = item.orgIndexCode
//     })
//     return datas
//   })
// }

/**
 * 依据人员ID得到人员基本信息
 * @param c personId 人员ID
 */
function seeDetail(c: string) {
  console.log(c)
  queryPersonnelDetails(c).then(res => {
    console.log(res)
    DemoFrom(res)
  })
}

const TableList: React.FC<{}> = () => {
  useEffect(() => {
    // 从服务器获取组织机构
    queryOrganization().then(data => {
      let oData = data, oTreeData = data, oTreeArray = []
      // console.log(oData)
      // oTreeData.map(item => {
      //   recursionOrganization(item)
      // })
      oTreeArray = _recursionOrganization([oTreeData])
      // console.log(oTreeArray)
      // organizationDataRender(oTreeData).map(item => {
      //   item.title = item.orgName
      //   item.key = item.orgIndexCode
      //   item.icon = <UserOutlined />
      // })
      // oTreeArray = [
      //   {
      //     title: 'parent 1-0',
      //     key: '0-0-0',
      //     icon: <CarryOutOutlined />,
      //     children: oTreeData || []
      //   }
      // ]
      setOrganizationData(oData || []);
      setOrganizationTreeData([oTreeData] || []);
      // 从服务器获取人员
      let parameters = {
        personName: '',
        orgIndexCodes: oTreeData.orgIndexCode,
        pageNo: 1,
        pageSize: 12,
        isSubOrg: true
      }
      setCode(oTreeData.orgIndexCode)
      queryPersonnel(parameters).then(data => {
        let tableData = data.list
        // console.log(tableData)
        tableData.forEach((item: any) => {
          item.key = item.orgIndexCode
        })
        setTableData(tableData || []);
      })
      // queryPersonnelList(parameters)
    })

    if (oData.length) {
      debugger
    }

  }, []);

  /**
   * 组装组织解构树形数据
   * @param list 数据源
   */
  function _recursionOrganization(dataArray){
      let resultArray = []; // 一级栏目
      let index = 1;
      let level = 1;
      for (let i = 0; i < dataArray.length; i++) {
        let item = dataArray[i];
        // 查找一级分类
        if (item.parentOrgIndexCode != "0") {
          //item.TaskParentId === null
          item["level"] = level;
          item["index"] = index;
          resultArray.push(item);
          _loadChildrenData(
            resultArray,
            dataArray,
            item,
            level + 1,
            index++
          );
        }
      }
      return resultArray;
  }

  function _loadChildrenData(resultArray, originArray, item, level, index) {
    // let deployed = 0
    // let undeployed = 0
    // let edit = 0
    // let completed = 0
    let index2 = 1;

    for (let i = 0; i < originArray.length; i++) {
      let originItem = originArray[i];
      // 判断是否是item项的子项
      if (originItem.parentOrgIndexCode === item.orgIndexCode) {
        item["hasChildren"] = true;
        item["showChildren"] = false;

        originItem["index"] = index + "." + index2;
        originItem["level"] = level;
        originItem["visible"] = false; // 子项默认隐藏
        originItem["hiddenByCategory"] = false;

        resultArray.push(originItem);
        console.log(resultArray)
        _loadChildrenData(
          resultArray,
          originArray,
          originItem,
          level + 1,
          index + "." + index2++
        );
      }
    }
  }

  const [detailVisible, setDetailVisible] = useState(false);
  const [oData, setOrganizationData] = useState<OrganizationDataItem[]>([]);
  const [oTreeData, setOrganizationTreeData] = useState<OrganizationDataItem[]>([]);
  const [code, setCode] = useState<string>('');
  const [personId, setPersonId] = useState<string>('');
  // console.log("----" + typeof(oData), oData, code)
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

  function getList(v: string) {
    console.log(v)
    // 从服务器获取人员
    let parameters = {
      personName: '',
      orgIndexCodes: v,
      pageNo: 1,
      pageSize: 12,
      isSubOrg: true
    }
    queryPersonnel(parameters).then(data => {
      let tableData = data.list
      console.log(tableData, 'czf')
      tableData.forEach((item: any) => {
        item.key = item.orgIndexCode
      })
      setTableData(tableData || []);
    })
  }

  function onSelect(selectedKeys: any, info: any) {
    console.log('selected', selectedKeys, info);
    getList(selectedKeys[0])
  };

  function showDetail(id:string) {
    setDetailVisible(true)
    setPersonId(id)
  }

  function handleCancel() {
    setDetailVisible(false)
  }

  function handleOk(){
    console.log("点击了OK")
  }

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: '20px' }}>
      <div className={styles.leftTree}>
        {/* <ul>
          {oData.map(item => (
            // <li key={item.orgIndexCode} onClick={e => setCode(item.orgIndexCode)}>
            <li key={item.orgIndexCode} onClick={e => getList(item.orgIndexCode)}>
              {item.orgName}
            </li>
          ))}
        </ul> */}
        {/* <Tree
          showLine
          switcherIcon={<DownOutlined />}
          showIcon
          treeData={oTreeData}
          onSelect={onSelect}
        /> */}
        <PersonnelTree></PersonnelTree>
      </div>
      {/* <Table columns={columns2} dataSource={tableData} style={{flex: 1}} /> */}
      <Table dataSource={tableData}>
        <Column 
          title="姓名" 
          dataIndex="personName" 
          key="personName"
          render={(text, record) => (
            <Space size="middle">
              <a onClick={e => showDetail(record.personId)}>{text}</a>
            </Space>
          )}
        />
        <Column title="性别" dataIndex="gender" key="gender" />
        <Column title="工号" dataIndex="jobNo" key="jobNo" />
      </Table>
      <Modal
          title="人员详情"
          width={800}
          visible={detailVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <PersonnelDetail value={personId}></PersonnelDetail>
        </Modal>
    </div>
  );
};

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    const { id } = this.props
    seeDetail(id)
    this.setState({
      visible: true,
    });

  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} >
          查看详情11
        </Button>
        <Modal
          title="人员详情"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
        >
          {Demo()}
        </Modal>
      </div>
    );
  }
}


export default TableList;
