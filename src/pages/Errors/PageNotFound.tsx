import { PageHeader } from '../../components';

const PageNotFound: React.FC = () => {
  return (
    <section>
      <PageHeader>404 Not Found.</PageHeader>

      <pre>The page you are requesting does not seem to exist.</pre>
    </section>
  );
};

export { PageNotFound };
