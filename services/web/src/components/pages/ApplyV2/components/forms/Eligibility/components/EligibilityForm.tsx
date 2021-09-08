import { useState } from 'react';

import { states } from '../../../../../../../utils/data/states';

import {
  Form,
  Input,
  Card,
  InputNumber,
  Typography,
  Select,
  Divider,
  Button,
  Checkbox,
} from 'antd';

import { useSelector } from 'react-redux';

const { Option } = Select;

const { Text } = Typography;

const Index = ({
  formValues,
  handleChange,
  onStateChange,
  handleCheckBoxChange,
  showPrograms,
}) => {
  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() => showPrograms()}
    >
      <Card headStyle={{ background: ' #472D5B' }}>
        <p>
          Welcome to Family Promise of Spokane's Housing Assistance Application.
        </p>
        <br />
        <p>
          Please begin by providing information about your Landlord or Property
          Manager.
        </p>
        <Text type="secondary">
          This will help us contact your landlord. We must verify information
          with your landlord to approve any requests.
          <br></br>
          <br />
        </Text>
        <b>
          Providing false or incorrect information here may greatly increase the
          time and work needed to approve your request.
        </b>
        <Divider />

        <Form.Item
          hasFeedback
          initialValue={formValues.state}
          label="State"
          name="state"
          rules={[{ required: true, message: 'State is required' }]}
        >
          <Select
            onChange={onStateChange}
            showSearch
            placeholder="Select a state"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {states.map(state => (
              <Option value={state}>{state}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.cityName}
          label="City"
          name="cityName"
          rules={[
            { required: true, min: 3, message: 'City is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="cityName" value={formValues.city} />
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.address}
          label="Address"
          name="address"
          rules={[
            { required: true, message: 'Address is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="address" />
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.addressLine2}
          label="Address Line Two"
          name="addressLine2"
        >
          <Input name="addressLine2" />
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.zipCode}
          label="Postal Code"
          name="zipCode"
          rules={[
            {
              type: 'number',
              required: true,
              message: 'Postal code is required',
            },
            {
              required: true,
              pattern: RegExp(/^\d{5}$/),
              message: 'Invalid postal code',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} name="zipCode" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="monthlyIncome"
          initialValue={formValues.monthlyIncome}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Monthly Income'
              : 'Monthly Income'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/
              ),
              message: 'Invalid income',
            },
          ]}
        >
          <Input name="monthlyIncome" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="monthlyRent"
          initialValue={formValues.monthlyRent}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Monthly Rent'
              : 'Monthly Rent'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/
              ),
              message: 'Invalid rent',
            },
          ]}
        >
          <Input name="monthlyRent" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="owed"
          initialValue={formValues.owed}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Total Amount Owed'
              : 'Total owed'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/
              ),
              message: 'Invalid total',
            },
          ]}
        >
          <Input name="owed" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="amountRequested"
          initialValue={formValues.amountRequested}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Total Amount Requested'
              : 'Total requested'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/
              ),
              message: 'Invalid total',
            },
          ]}
        >
          <Input name="amountRequested" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.minorGuest}
            name="minorGuest"
            onChange={handleCheckBoxChange}
          >
            Household has at least one minor (17 or younger) or at least one
            person is pregnant?
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={formValues.unEmp90}
            name="unEmp90"
            onChange={handleCheckBoxChange}
          >
            Been unemployed for 90+ consecutive days as of today?
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.foodWrkr}
            name="foodWrkr"
            onChange={handleCheckBoxChange}
          >
            At least one person in the household worked in the food service
            industry at any time since January 1, 2020?
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={formValues.qualifiedForUnemployment}
            name="qualifiedForUnemployment"
            onChange={handleCheckBoxChange}
          >
            <p>
              Qualified for unemployment or experienced a reduction in household
              income?
            </p>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={formValues.covidFH}
            name="covidFH"
            onChange={handleCheckBoxChange}
          >
            <p>
              Incurred new expenses or experienced a financial hardship due to
              COVID?
            </p>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.proofOfRisk}
            name="proofOfRisk"
            onChange={handleCheckBoxChange}
          >
            <p>
              Can demonstrate a risk of being homeless or being displaced
              because of eviction notices or past due utilities?
            </p>
          </Checkbox>
        </Form.Item>
        <Button htmlType="submit">Check your Eligibilty</Button>
      </Card>
    </Form>
  );
};

const updateLandlordInfo = async () => {};

export default Index;