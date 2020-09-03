import React, { useState, useRef, useEffect } from 'react';
import { Input, Form } from 'antd';

function PersonnelDetail() {
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
  )
}
 
export default PersonnelDetail;