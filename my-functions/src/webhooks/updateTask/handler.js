import gql from 'graphql-tag'
import { responseBuilder } from '../utils'

export const MARK_TASK_COMPLETED = gql`
  mutation UpdateTaskForm($id: ID) {
    taskUpdate(data: {status: true}, filter: {id: $id}) {
      id
    }
  }
`; 


module.exports = async (event, ctx) => {
  
  const  id  = event.body

  try {
    
    await ctx.api.gqlRequest(MARK_TASK_COMPLETED, { id:id })
   
    return responseBuilder(200, { result: 'ok' })
  } catch (r) {
    
    return responseBuilder(400, JSON.stringify(r))
  }
}
