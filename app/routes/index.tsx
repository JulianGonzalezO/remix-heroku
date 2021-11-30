import type { User } from ".prisma/client";
import type { MetaFunction, LinksFunction, LoaderFunction, ActionFunction } from "remix";
import { useLoaderData, Form, redirect } from "remix";

import { db } from "~/utils/db.server";
import stylesUrl from "../styles/index.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = Array<User>;
export let loader: LoaderFunction = async () => {
  let data: LoaderData = await db.user.findMany()
  return data;
};
export let action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let name = form.get("name");
  if (typeof name !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }
  await db.user.create({
    data: {
      email: 'ju@ama',
      name,
    }
  })
  return redirect('/');
};

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export default function Index() {
  let data = useLoaderData<LoaderData>();
  return (
    <div className="remix__page">
      <main>
        <h2>Login</h2>
        <Form method="post">
          <label>Usuario</label>
          <input name="name" />
          <label>Contraseña</label>
          <input />
          <div>
            <button type="submit" className="button">
              Add
            </button>
          </div>
        </Form>
      </main>
      <aside>
        <h2>Users</h2>
        <ul>
          {data.map(user => (
            <li key={user.id} className="remix__page__resource">
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
