import './Launch.css';
import { useLazyQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
const GET_ROCKET_DATA = gql`
  query($rocketId: ID!) {
    rocket(id: $rocketId) {
      id
      active
      boosters
      cost_per_launch
      type
      description
    }
  }
`;

function RocketInfo({rocketInfo}) {
  let { active, cost_per_launch, boosters, description} = rocketInfo;
  // let [active, cost_per_launch, boosters] = {rocketInfo}
  return (
    <div>
      <p>Active: {active && 'Active'}</p>
      <p>Cost per launch: ${cost_per_launch}</p>
      <p>Number of boosters: {boosters}</p>
      <p>Description: {description}</p>
    </div>
  )
}
function Launch({launch}) {
  const [getRocketData, { loading, error, data }] = useLazyQuery(GET_ROCKET_DATA);
  
 
    return (
      <div className="launch">
        <p>Date of launch was: {launch.launch_date_utc}</p>
        <p>Launch Details: {launch.details}</p>
        {data?.rocket &&
        <div>
          <RocketInfo rocketInfo={data.rocket}></RocketInfo>
        </div>
        }
        <button className="button-6" onClick={(e) => getRocketData({variables: { "rocketId": launch.rocket.rocket.id}})}>Get mission details</button>
      </div>
    )
  }
export default Launch;