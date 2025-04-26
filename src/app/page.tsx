'use client';

import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {

  const { user, isLoading } = useUser();

  if(isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if(user)
    return (
      <div>
        <h1>Welcome {user.name}</h1>
        <a href="/auth/logout">Logout</a>
      </div>
    );

  return (
    <div>
      <h1>Welcome to Bridge</h1>
      <a href="/auth/login">Login</a>
      <p>Please login to continue.</p>
    </div>
  );
}
