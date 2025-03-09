import RecentlyPlayed from "../Components/RecentlyPlayed";
import Search from "../Components/Search";
import TrackList from "../Components/TrackList";
import User from "../Components/User";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* <TrackList /> */}
      <Search />
      {/* <User />
      <RecentlyPlayed /> */}
    </div>
  );
};

export default Dashboard;
