import { useState } from 'react';

import { Menu, Dropdown, message, Spin, Space } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { LoadingOutlined, EllipsisOutlined } from '@ant-design/icons';

export default function Status({ document, setRequests }) {
  const { status: docStatus, requestId, docId, category } = document;

  const [status, setStatus] = useState(docStatus);

  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    axiosWithAuth()
      .put(`/documents/${docId}`, { status })
      .then(() => {
        message.success(`Successfully updated document status to ${status}`);

        setRequests(prevState =>
          prevState.map(request => {
            if (request.id === requestId) {
              request[category] = request[category].map(doc => {
                if (doc.docId == docId) {
                  doc.status = status;
                }
                return doc;
              });
            }

            return request;
          })
        );
      })
      .catch(() => message.error('Unable to update status'))
      .finally(() => setLoading(false));
  };

  const handleMenuClick = e => {
    setStatus(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verified">Verified (Ok)</Menu.Item>
      <Menu.Item key="actionsRequired">Actions Required</Menu.Item>
      <Menu.Item key="denied">
        {<p style={{ color: 'red' }}>Denied</p>}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown.Button
      style={{ marginBottom: '1rem' }}
      icon={loading ? <LoadingOutlined /> : <EllipsisOutlined />}
      onClick={handleButtonClick}
      overlay={menu}
    >
      {camelCaseToSentenceCase(status)}
    </Dropdown.Button>
  );
}

const camelCaseToSentenceCase = text => {
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
};
