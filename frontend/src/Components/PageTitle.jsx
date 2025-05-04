// src/components/SetPageTitle.jsx
import { Helmet } from 'react-helmet';

export default function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title} - YourWORDS</title>
    </Helmet>
  );
}
