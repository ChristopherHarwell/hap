import { Select } from 'antd';

import { Form, Input, Button, Checkbox } from 'antd';

import SmartyStreetsSDK from 'smartystreets-javascript-sdk';

const Index = () => {
  const SmartyStreetsCore = SmartyStreetsSDK.core;
  const Lookup = SmartyStreetsSDK.usStreet.Lookup;

  let key = '123';

  const credentials = new SmartyStreetsCore.SharedCredentials(key);

  let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials)
    .withBaseUrl('http://localhost:3000')
    .withLicenses(['us-rooftop-geocoding-cloud']);

  let client = clientBuilder.buildUsStreetApiClient();

  const onFinish = values => {
    let lookup1 = new Lookup();
    lookup1.inputId = '24601'; // Optional ID from your system
    lookup1.addressee = 'John Doe';
    lookup1.street = '330 N 100 W';
    lookup1.street2 = 'closet under the stairs';
    lookup1.secondary = 'APT 2';
    lookup1.urbanization = ''; // Only applies to Puerto Rico addresses
    lookup1.city = 'Provo';
    lookup1.state = 'Utah';
    lookup1.zipCode = '84601';
    lookup1.maxCandidates = 3;
    lookup1.match = 'invalid'; // "invalid" is the most permissive match,
    // this will always return at least one result even if the address is invalid.
    // Refer to the documentation for additional MatchStrategy options.

    let lookup2 = new Lookup();
    lookup2.street = '1600 Amphitheater Pkwy';
    lookup2.lastLine = 'Mountainview, CA';
    lookup2.maxCandidates = 5;

    let lookup3 = new Lookup();
    lookup3.inputId = '8675309';
    lookup3.street = '1600 Amphitheatre Parkway Mountain View, CA 94043';
    lookup3.maxCandidates = 1;

    // NOTE: batches are not supported when using SharedCredentials.
    let batch = new SmartyStreetsCore.Batch();
    batch.add(lookup1);
    batch.add(lookup2);

    client
      .send(batch)
      .then(handleSuccess)
      .catch(handleError);

    function handleSuccess(response) {
      response.lookups.map(lookup => console.log(lookup.result));
    }

    function handleError(response) {
      console.log(response);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        height: '70vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form
        name="basic"
        style={{ width: 400 }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ZipCode"
          name="zipCode"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
