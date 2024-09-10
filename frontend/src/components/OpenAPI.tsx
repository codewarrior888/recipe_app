import React from 'react';
import SwaggerUI from 'swagger-ui-react';

import '../styles/OpenAPI.scss';

const OpenAPI: React.FC = () => {
  const swaggerUrl = 'http://127.0.0.1:8000/api/schema/';

  return (
    <div>
      <h1>API Documentation</h1>
      <SwaggerUI url={swaggerUrl} />
    </div>
  );
};

export default OpenAPI;
