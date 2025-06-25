import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-[calc(100vh-14rem)] items-center justify-center bg-gradient-to-br from-muted/50 to-background px-4">
      <div className="text-center max-w-2xl space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Welcome to Your Dashboard
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          Everything you need to manage your data, users, and insights — all in one place.
        </p>
        <div>
       <Link to={'/users'}>
          <button className="mt-6 rounded-2xl bg-primary px-6 py-3 text-white text-sm font-medium shadow hover:bg-primary/90 transition">
            Get Started
          </button>
       </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
