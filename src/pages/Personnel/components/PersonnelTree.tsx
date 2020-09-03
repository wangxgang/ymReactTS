import React, { useState, useRef, useEffect } from 'react';
import { DownOutlined, CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { OrganizationDataItem } from '../data.d';
import './PersonnelTree.css';

const treeArray = [
  {
    id: 1,
    name: '食品',
    parentId: 0,
  },
  {
    id: 2,
    name: '水果',
    parentId: 1,
  },
  {
    id: 3,
    name: '香蕉',
    parentId: 2,
  },
  {
    id: 4,
    name: '苹果',
    parentId: 2,
  },
  {
    id: 5,
    name: '零食',
    parentId: 1,
  },
  {
    id: 6,
    name: '休闲零食',
    parentId: 5,
  },
  {
    id: 7,
    name: '辣条',
    parentId: 6,
  },
  {
    id: 8,
    name: '香肠',
    parentId: 6,
  },
  {
    id: 9,
    name: '儿童零食',
    parentId: 5,
  },
  {
    id: 10,
    name: '3-5岁',
    parentId: 9,
  },
  {
    id: 11,
    name: '好多鱼',
    parentId: 10,
  },
  {
    id: 12,
    name: '6-10岁',
    parentId: 9,
  },
  {
    id: 13,
    name: '奶酪棒',
    parentId: 12,
  },
  {
    id: 14,
    name: '牛奶蛋糕',
    parentId: 12,
  },
  {
    id: 15,
    name: '运动',
    parentId: 0,
  },
  {
    id: 16,
    name: '有氧运动',
    parentId: 15,
  },
  {
    id: 17,
    name: '无氧运动',
    parentId: 15,
  },
  {
    id: 18,
    name: '游泳',
    parentId: 16,
  },
  {
    id: 19,
    name: '俯卧撑',
    parentId: 17,
  },
  {
    id: 20,
    name: '娱乐',
    parentId: 0,
  },
];

const treeData2 = [
  {
    id: 1,
    name: '食品',
    parentId: 0,
    key: 1,
    title: '食品',
    children: [
      {
        id: 2,
        name: '水果',
        parentId: 1,
        key: 2,
        title: '水果',
        children: [
          { id: 3, name: '香蕉', parentId: 2, key: 3, title: '香蕉' },
          { id: 4, name: '苹果', parentId: 2, key: 4, title: '苹果' },
        ],
      },
      {
        id: 5,
        name: '零食',
        parentId: 1,
        key: 5,
        title: '零食',
        children: [
          {
            id: 6,
            name: '休闲零食',
            parentId: 5,
            key: 6,
            title: '休闲零食',
            children: [
              { id: 7, name: '辣条', parentId: 6, key: 7, title: '辣条' },
              { id: 8, name: '香肠', parentId: 6, key: 8, title: '香肠' },
            ],
          },
          {
            id: 9,
            name: '儿童零食',
            parentId: 5,
            key: 9,
            title: '儿童零食',
            children: [
              {
                id: 10,
                name: '3-5岁',
                parentId: 9,
                key: 10,
                title: '3-5岁',
                children: [{ id: 11, name: '好多鱼', parentId: 10, key: 11, title: '好多鱼' }],
              },
              {
                id: 12,
                name: '6-10岁',
                parentId: 9,
                key: 12,
                title: '6-10岁',
                children: [
                  { id: 13, name: '奶酪棒', parentId: 12, key: 13, title: '奶酪棒' },
                  { id: 14, name: '牛奶蛋糕', parentId: 12, key: 14, title: '牛奶蛋糕' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-0-0-1', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
];

const PersonnelTree = () => {
  const [oTreeData, setOrganizationTreeData] = useState<OrganizationDataItem[]>([]);
  useEffect(() => {
    // let treeObj = toTree(treeArray);
    let treeObj = translateDataToTree(treeArray);
    console.log(treeObj, JSON.stringify(treeObj));
    setOrganizationTreeData(treeObj);
  }, [treeArray]);
  return (
    <div>
      {
        oTreeData && oTreeData.length ? 
        <Tree 
          showLine 
          defaultExpandAll 
          switcherIcon={<DownOutlined />} 
          showIcon 
          treeData={oTreeData} 
          className="hide-file-icon"
        /> : '暂无数据'
      }
    </div>
  );
};

function toTree(data) {
  let result = [];
  if (!Array.isArray(data)) {
    return result;
  }
  data.forEach((item) => {
    delete item.children;
  });
  let map = {};
  data.forEach((item) => {
    map[item.id] = item;
  });
  data.forEach((item) => {
    let parent = map[item.parentId];
    item.key = item.id;
    item.title = item.name;
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

/**
 * 该方法用于将有父子关系的数组转换成树形结构的数组
 * 接收一个具有父子关系的数组作为参数
 * 返回一个树形结构的数组
 * 关键的属性名有id,parentId,childrens
 * 思路：将有父子关系的数组数据先分为两类，一类是没有父节点的数据(取个别名parents)，另一类是有父节点的数据(取个别名childrens)，然后通过遍历parents,对每一个父节点在childrens查找对应的子节点,并将其放入父节点的childrens中(这里我的是以childrens表示子节点)，然后每个子节点又作为一个父节点来重复之前的动作。
 */
function translateDataToTree(data) {
  //没有父节点的数据
  let parents = data.filter((value) => value.parentId == 'undefined' || value.parentId == null || value.parentId == 0);

  //有父节点的数据
  let childrens = data.filter((value) => value.parentId !== 'undefined' && value.parentId != null && value.parentId != 0);

  //定义转换方法的具体实现
  let translator = (parents, childrens) => {
    //遍历父节点数据
    parents.forEach((parent) => {
      parent.key = parent.id
      parent.title = parent.name
      //遍历子节点数据
      childrens.forEach((current, index) => {
        //此时找到父节点对应的一个子节点
        if (current.parentId === parent.id) {
          //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
          let temp = JSON.parse(JSON.stringify(childrens));
          //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
          temp.splice(index, 1);
          //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
          translator([current], temp);
          //把找到子节点放入父节点的childrens属性中
          typeof parent.children !== 'undefined'
            ? parent.children.push(current)
            : (parent.children = [current]);
        }
      });
    });
  };

  //调用转换方法
  translator(parents, childrens);

  //返回最终的结果
  return parents;
}

export default PersonnelTree;
