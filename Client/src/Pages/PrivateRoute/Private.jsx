import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {LoginContext} from '../../Context/LoginContext'

const Private = ({component: Component, ...rest}) => {
  const [state] = useContext(LoginContext)

  return(
    <Route {...rest} render={(props) => state.isLogin ? <Component {...props}/> : <Redirect to='/' />}/>
  )
}

export default Private
