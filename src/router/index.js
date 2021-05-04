import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routePaths from './routePaths'

import Modal from '../containers/Modal'

import Dashboard from '../containers/Dashboard'
import StoryBuilder from '../containers/StoryBuilder'

const Routes = () => {
    const routes = [
        { path: routePaths.Home, cmp: Dashboard, exact: true },
        { path: routePaths.StoryBuilder, cmp: StoryBuilder, exact: true },
    ]

    return (
        <Router>
            <Modal />
            <Switch>
                { routes.map(r => <Route path={r.path} component={r.cmp} exact={r.exact} key={r.path} />)}
            </Switch>
        </Router>
    )
}

export default Routes