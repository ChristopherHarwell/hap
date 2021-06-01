import DocumentsTable from './DocumentsTable';

import { Typography, Divider } from 'antd';
const { Title, Paragraph } = Typography;

//

//If they opt out pop out a modal that reads the form with a I Acknowledge etc. etc
// toggle status to optOut
//If docs good toggles status to received
//------------------------------------------------
//For status/ category trackingn handle on FE
//Write a list of the four categories - get all docs for the request
// show x/4 received, x/4 optOut, x/4 missing

export default function Index({
  request,
  documentStatuses,
  setDocumentStatuses,
}) {
  return (
    <div className="documentsContainer" style={{ padding: '2%' }}>
      <div className="documentStatuses">
        <Title level={4}>Document Statuses:</Title>
        <DocumentsTable
          documentStatuses={documentStatuses}
          request={request}
          setDocumentStatuses={setDocumentStatuses}
        />
      </div>
    </div>
  );
}
