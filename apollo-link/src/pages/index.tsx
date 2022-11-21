import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'

const QUERY = gql`
  query @live {
    todoListCollection(first: 5) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const Index = () => {
  const { data } = useQuery(QUERY)

  return (
    <div>
      {data && (
        <div>
          {data.todoListCollection.edges.map((edge: any) => (
            <div key={edge.node.id}>
              <div>{edge.node.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: ViewerQuery,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   }
// }

export default Index
