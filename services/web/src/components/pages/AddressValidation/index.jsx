import { Select } from 'antd';

export default function Index() {
  return (
    <div
      style={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Select
        showSearch
        style={{ width: 400, height: 200 }}
        placeholder="Enter your address"
      ></Select>
    </div>
  );
}
