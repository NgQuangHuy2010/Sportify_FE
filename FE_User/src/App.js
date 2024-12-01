import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={route.layout === null ? (
                  <Page />
                ) : (
                  route.layout ? (
                    <route.layout>
                      <Page />
                    </route.layout>
                  ) : (
                    <div>Layout not found</div>
                  )
                )}
                
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
