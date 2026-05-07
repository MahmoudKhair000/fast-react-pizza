import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const navigate = useNavigate();
  const errorObject = useRouteError();

  console.log(errorObject);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {errorObject.data && (
        <h3>{`${errorObject.status}: ${errorObject.statusText}`}</h3>
      )}
      {errorObject.message && <h3>{errorObject.message}</h3>}
      <p>{errorObject.data || errorObject.message}</p>
      <LinkButton to={'-1'} onClick={() => navigate(-1)}>
        &larr; Go back
      </LinkButton>
    </div>
  );
}

export default Error;
