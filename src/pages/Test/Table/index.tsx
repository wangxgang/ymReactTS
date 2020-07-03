import React, { useState, useEffect } from 'react';
import { queryOrganization } from './service';

export interface OrganizationDataItem {
  orgIndexCode: string;
  orgNo: string;
  orgName: string;
  orgPath: string;
  parentOrgIndexCode: string;
  parentOrgName: string;
  updateTime: string;
}

function Personnel() {
  const [oData, setOrganizationData] = useState<OrganizationDataItem[]>([]);
  useEffect(() => {
    // 从服务器获取组织机构
    queryOrganization().then(data => {
      let oData = data
      console.log(oData)
      setOrganizationData(oData || []);
    })
  },[]);
 
  return (
    <ul>
      {oData.map(item => (
        <li key={item.orgName}>
          {item.orgName}
        </li>
      ))}
    </ul>
  );
}
 
export default Personnel;