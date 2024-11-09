const Homepage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to Travel Journal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          {/* Add recent posts content */}
        </div>

        {/* Popular Destinations */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
          {/* Add popular destinations content */}
        </div>

        {/* My Activities */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">My Activities</h2>
          {/* Add user activities content */}
        </div>
      </div>
    </div>
  );
};

export default Homepage; 