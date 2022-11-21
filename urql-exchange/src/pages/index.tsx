import { useQuery } from 'urql'
import styles from '../styles/Home.module.css'

const query = /* GraphQL */ `
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

export default function Home() {
  const [{ data, fetching, error }] = useQuery({ query })

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          {fetching && <div>loading...</div>}
          {error && <div>error: {error.message}</div>}
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
      </main>
    </div>
  )
}
