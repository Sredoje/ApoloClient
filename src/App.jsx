import './App.css';
import { useQuery, gql } from '@apollo/client';
import Launch from './Launch';
const GET_PAST_LAUNCHES = gql`
{
  launchesPast(limit: 20) {
    mission_id
    details
    launch_date_utc
    rocket {
      rocket {
        id
      }
    }
  }
}
`;


function App() {

  const { loading, error, data } = useQuery(GET_PAST_LAUNCHES)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <header className="App-header">
        <div>Last Three Launches:</div>
        {
          data.launchesPast.map((launch) => <Launch key={launch.mission_id} launch={launch}></Launch>)
        }
      </header>
    </div>
  );
}

export default App;
