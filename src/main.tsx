import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import App from './App.tsx'
import Dashboard from "./pages/dashboard.tsx";
import Subject from "./pages/subject/subject.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route index element={<App />} />
              <Route path={"dashboard"} element={<Dashboard />} />

              <Route path={"/subjects"}>
                  {/*Add index route here, just a list of subjects*/}
                  <Route path=":subjectId" element={<Subject />} />

                  {/*<Route path="register" element={} />*/}
              </Route>


              {/*<Route path="concerts">*/}
              {/*    <Route index element={<ConcertsHome />} />*/}
              {/*    <Route path=":city" element={<City />} />*/}
              {/*    <Route path="trending" element={<Trending />} />*/}
              {/*</Route>*/}
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
