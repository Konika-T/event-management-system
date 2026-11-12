import EventCard from "../components/EventCard";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-100 px-6 py-20 text-center">
        <h1 className="text-2xl md:text-6xl font-bold text-red-500">
          Welcome to EventHub
        </h1>

        <p>
          Discover and register for exciting events.
        </p>

        <button className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Explore Events
        </button>
      </section>

      {/* Events Section */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <h2 className="text-3xl font-bold text-slate-900">
            Upcoming Events
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <EventCard
              title="Tech Fest 2026"
              description="A technology event for students."
              date="20 September 2026"
              location="Mumbai"
            />
            <EventCard
              title="React Workshop"
              description="Learn React from basics to advanced."
              date="25 September 2026"
              location="Pune"
            />
            <EventCard
              title="AI Conference"
              description="Explore the latest developments in AI."
              date="30 September 2026"
              location="Bangalore"
            />
          </div>

        </div>
      </section>

      {/* Responsive Demo Section */}
      <section className="bg-white p-4 md:bg-blue-100 md:p-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">

          <h2 className="text-2xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            Responsive Demo
          </h2>

          <p className="block font-semibold text-red-600 md:hidden">
            Mobile view
          </p>

          <p className="hidden font-semibold text-green-700 md:block">
            Tablet / Desktop view
          </p>

          <button className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white md:w-auto">
            Register
          </button>

        </div>
      </section>

    </div>
  );
}

export default Home;