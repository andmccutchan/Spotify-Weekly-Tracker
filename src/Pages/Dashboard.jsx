import RecentlyPlayed from "../Components/RecentlyPlayed";
import TrackList from "../Components/TrackList";
import User from "../Components/User";

const Dashboard = () => {
  return (
    <div className="w-full bg-stone-200">
      {/* <TrackList /> */}
      <User />
      <RecentlyPlayed />
    </div>
  );
};

export default Dashboard;
