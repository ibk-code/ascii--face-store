import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const App = lazy(() => import('./App'));

const Router = () => (
    <BrowserRouter>
        <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
                <Route exact path="/" component={App}/>
            </Switch>
        </Suspense>
    </BrowserRouter>
);

export default Router;