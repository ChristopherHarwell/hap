import { Card, Descriptions } from 'antd';

export default function RequestInfo({ request }) {
  console.log(request);

  const addressCardData = {
    title: 'Address',
    descriptions: [
      { label: 'Street', data: request.address },
      { label: 'City & State', data: request.cityName + ', ' + request.state },
      { label: 'Zip Code', data: request.zipCode },
    ],
  };

  const applicantCardData = {
    title: 'Tenant Information',
    descriptions: [
      { label: 'Name', data: request.firstName + ' ' + request.lastName },
      { label: 'Email', data: request.email },
      { label: 'Amount Owed', data: request.owed },
      { label: 'Amount Requested', data: request.amountRequested },
    ],
  };

  return (
    <div>
      <h1>Request Information</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio
        non, nobis ipsam qui harum fugit velit molestias itaque quam est id
        soluta excepturi neque at, provident minima sapiente expedita.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ContentCard cardData={addressCardData} />
        <ContentCard cardData={applicantCardData} />
      </div>
    </div>
  );
}

const ContentCard = ({ cardData }) => {
  const { title, descriptions } = cardData;

  return (
    <Card title={title} style={{ width: '18rem' }}>
      <Descriptions column={1}>
        {descriptions.map(description => (
          <Descriptions.Item label={description.label}>
            {description.data}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};
