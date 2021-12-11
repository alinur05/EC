import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'

export default function AppRouter() {
    const isAuth = useSelector(state => state.session.isAuth)
    
    return (
        isAuth ?
            <Switch>
                {
                    privateRoutes.map(route => 
                        <Route
                            key={route.path}
                            path={route.path}
                            component={route.component}
                            exact={route.exact}
                        />
                    )
                }
                <Redirect to="/main" />
            </Switch>
        :

            <Switch>
                {
                    publicRoutes.map(route => 
                        <Route
                            key={route.path}
                            path={route.path}
                            component={route.component}
                            exact={route.exact}
                        />
                    )
                }
                <Redirect to="/main" />
            </Switch>
    )
}
