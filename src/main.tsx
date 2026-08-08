import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import App from './App.tsx'
import Dashboard from "./pages/dashboard.tsx";
import SubjectLayout from "./pages/subjects/subject-layout.tsx";
import SubjectOverviewPage from "./pages/subjects/subject-overview-page.tsx";
import LessonPage from "./pages/materials/lesson-page.tsx";
import ResourcePage from "./pages/materials/resource-page.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./lib/queryClient.ts";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route index element={<App />} />
                  <Route path={"dashboard"} element={<Dashboard />} />

                  <Route path="/subjects/:subjectId" element={<SubjectLayout />}>
                      <Route
                          index
                          element={<SubjectOverviewPage />}
                      />

                      <Route
                          path="lessons/:lessonId"
                          element={<LessonPage />}
                      />

                      <Route
                          path="resources/:resourceId"
                          element={<ResourcePage />}
                      />

                      {/*<Route*/}
                      {/*    path="quizzes/:materialId"*/}
                      {/*    element={<QuizPage />}*/}
                      {/*/>*/}
                  </Route>


                  {/*<Route path="concerts">*/}
                  {/*    <Route index element={<ConcertsHome />} />*/}
                  {/*    <Route path=":city" element={<City />} />*/}
                  {/*    <Route path="trending" element={<Trending />} />*/}
                  {/*</Route>*/}
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>
)
