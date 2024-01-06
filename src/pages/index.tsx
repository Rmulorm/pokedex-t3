import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const { data: pokemonList } = api.pokemon.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Pokedex T3</title>
        <meta name="description" content="Pokedex created with T3 Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && <SignOutButton />}
        </div>
        <div>
          {pokemonList?.map((pokemon) => (
            <div key={pokemon.id}>{pokemon.name}</div>
          ))}
        </div>
      </main>
    </>
  );
}
