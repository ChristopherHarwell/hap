import React from 'react';

import {
  Card,
  Checkbox,
  Button,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Typography,
  Divider,
} from 'antd';

import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

import { setCurrentUser } from '../../../../../redux/users/userActions';

const { Option } = Select;

export default function Address({
  formValues,
  handleChange,
  onStateChange,
  setCurrentContent,
  currentUser,
  dispatch,
}) {
  const request = useSelector(state => state.requests.request);

  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() =>
        updateHousehold(
          formValues,
          setCurrentContent,
          request,
          currentUser,
          dispatch
        )
      }
    >
      <Card>
        <Form.Item
          name="familySize"
          initialValue={formValues.familySize}
          label=" Residents"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([1-9][0-9]?)\s*$/),
              message: 'Invalid number of residents',
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            name="familySize"
            value={formValues.familySize}
          />
        </Form.Item>

        <Form.Item
          name="totalChildren"
          initialValue={formValues.totalChildren}
          label="Children in Household"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([0-9][0-9]?)\s*$/),
              message: 'Invalid number of children',
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            name="totalChildren"
            value={formValues.totalChildren}
          />
        </Form.Item>

        <Form.Item
          name="beds"
          initialValue={formValues.beds}
          label="Total Bedrooms"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([0-9][0-9]?)\s*$/),
              message: 'Invalid number of bedrooms',
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            name="beds"
            value={formValues.beds}
          />
        </Form.Item>

        <Button htmlType="submit">Next</Button>
      </Card>
    </Form>
  );
}

const updateHousehold = async (
  formValues,
  setCurrentContent,
  request,
  currentUser,
  dispatch
) => {
  const {
    familySize,
    totalChildren,
    beds,
    monthlyIncome,
    monthlyRent,
    owed,
    amountRequested,
  } = formValues;

  const householdInfo = {
    familySize,
    totalChildren,
    beds,
    monthlyIncome,
    monthlyRent,
    owed,
    amountRequested,
  };

  try {
    await axiosWithAuth().put(`/requests/${request.id}`, householdInfo);

    if (currentUser.applicationStep === 'household') {
      await axiosWithAuth()
        .put('/users/me', {
          applicationStep: 'demographics',
        })
        .then(res => dispatch(setCurrentUser(res.data.user)));
    }

    setCurrentContent('demographics');
  } catch (error) {
    alert(error);
    console.log(error);
  } finally {
  }
};
