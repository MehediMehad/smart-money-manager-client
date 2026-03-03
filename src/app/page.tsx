import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-green-500">This is Home Page</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link className="underline" href="/dashboard">
        Dashboard
      </Link>
    </div>
  );
};

export default HomePage;
