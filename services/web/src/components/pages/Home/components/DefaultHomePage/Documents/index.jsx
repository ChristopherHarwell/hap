import { useState } from 'react';

import { useSelector } from 'react-redux';

import DocumentsTable from './DocumentsTable';

import { Typography } from 'antd';
const { Title } = Typography;

export default function Index({ request }) {
  let documents = useSelector(state => state.requests.documents);

  //Build status object for state
  const buildStatuses = docs => {
    const stats = {};
    docs.forEach(doc => {
      stats[doc.category] = doc.status;
    });
    return stats;
  };

  const [statuses, setStatuses] = useState(buildStatuses(documents));

  return (
    <div className="documentsContainer" style={{ padding: '2%' }}>
      <div className="documentStatuses">
        <Title level={4}>Document Statuses:</Title>
        <DocumentsTable
          documentStatuses={statuses}
          request={request}
          setDocumentStatuses={setStatuses}
        />
      </div>
    </div>
  );
}