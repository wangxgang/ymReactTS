# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).


### 库
#### classnames
一个简单的JavaScript实用程序，用于有条件地将类名连接在一起。
#### use-merge-value
易于编写受控组件
  ```typescript
  import React, { useState } from 'react';
  import useMergeState from 'use-merge-value';
  
  const ControlledInput: React.FC<{ value: string; onChange: (value: string) => void }> = props => {
    const [value, setValue] = useMergeState('', props);
    return (
      <div>
        <input value={value} onChange={e => setValue(e.target.value)}></input>{' '}
      </div>
    );
  };
  ```