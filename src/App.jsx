import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { EntityListView } from './components/EntityListView';
import entities from './entities';
import { EntityDetailView } from './components/EntityDetailView';
import { EntityCreateView } from './components/EntityCreateView';

import './app.css'

const BASE_URL='http://localhost:3000'

const createEntityListLoader = (entity) => () => {
  return fetch(BASE_URL + entity.baseUrl, {
    method: 'GET',
    cors: 'no-cors',
  });
}

const createEntityEditLoader = (entity) => ({params}) => {
  const {id} = params;
  return fetch(`${BASE_URL}${entity.baseUrl}/${id}`, {
    method: 'GET',
    cors: 'no-cors',
  })
}

const entityRoutes = entities.map(entity => {
  const baseRoute = `/${entity.plural.toLowerCase()}`;
  return [
    {
      path: baseRoute,
      loader: createEntityListLoader(entity),
      element: <EntityListView entity={entity}/>
    },
    {
      path: `${baseRoute}/create`,
      element: <EntityCreateView entity={entity}/>
    },
    {
      path: `${baseRoute}/:id`,
      loader: createEntityEditLoader(entity),
      element: <EntityDetailView entity={entity}/>
    },
  ]
}).flat();

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Root</div>
    },

    ...entityRoutes

  ]);
  return (
    <>
      <header>
        {entities.map(entity => <a key={entity.name} href={entity.baseUrl}>{entity.plural}</a>)}
      </header>
      <RouterProvider router={router} />
    </>
  )
    
}

export default App
