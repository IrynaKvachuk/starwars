import { Switch, Route, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader.js";

const CreaturesPage = lazy(() => import("./Creatures/CreaturesPage.js"));
const CreaturesById = lazy(() => import("./Creatures/CreaturesById.js"));
const PlanetsPage = lazy(() => import("./Planets/PlanetsPage.js"));
const PlanetsById = lazy(() => import("./Planets/PlanetsById.js"));

const Pages = () => {
  return (
    <section className="page__content">
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/creatures" component={CreaturesPage} />
          <Route path="/creatures/:id" component={CreaturesById} />
          <Route exact path="/planets" component={PlanetsPage} />
          <Route path="/planets/:id" component={PlanetsById} />
          <Redirect from="*" to="/creatures" />
        </Switch>
      </Suspense>
    </section>
  );
};

export default Pages;
