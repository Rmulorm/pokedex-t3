import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const { data: pokemonList, isLoading } = api.pokemon.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!pokemonList) return <div>Something went wrong 😥</div>;
  return (
    <>
      <Head>
        <title>Pokedex T3</title>
        <meta name="description" content="Pokedex created with T3 Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-4xl">
          <div className="border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <div className="flex justify-end">
                <SignInButton />
              </div>
            )}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
          <div className="m-4 flex flex-row gap-8">
            {pokemonList.map((pokemon) => (
              <div key={pokemon.id} className="flex flex-col ">
                <div>
                  <Image
                    src={pokemon.imageLink}
                    alt={`${pokemon.name} image`}
                    className="rounded-full border-2"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="justify-center ">
                  <h1 className="mt-4 text-center">
                    {pokemon.entryNumber.toString().padStart(3, "0")} -{" "}
                    {pokemon.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
