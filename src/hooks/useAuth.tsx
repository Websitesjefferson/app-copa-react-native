import { useContext } from 'react' 

import { AuthContext, AuthContextsDataProps  } from '../contexts/AuthContexts'

export function useAuth(): AuthContextsDataProps {

    const context = useContext(AuthContext)

    return context
}