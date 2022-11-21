import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client'
import merge from 'deepmerge'
import { getOperationAST } from 'graphql'
import { useMemo } from 'react'
import { isLiveQuery, SSELink } from './grafbase-link'

const GRAPHQL_URL = 'https://todo-aaa-vitalikda.grafbase.app/graphql'
const GRAPHQL_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg3ODk4NzUsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFHSjVUMUNCRk5XU1IyMUtaMjJOMTdBVEYiLCJqdGkiOiIwMUdKNVQxQ0JGWFhLV1JIMTBWMTJIUzkzRCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.DTxBJz6Cbw808t_v1JQzWhAlM6HNQnZijLh95a2xvE0'

let apolloClient

export const createApolloLink = () => {
  const sseLink = new SSELink({
    uri: GRAPHQL_URL,
    headers: {
      'x-api-key': GRAPHQL_KEY
    }
  })

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
      'x-api-key': GRAPHQL_KEY
    }
  })

  const link = split(
    ({ query, operationName, variables }) => isLiveQuery(getOperationAST(query, operationName), variables),
    sseLink,
    httpLink
  )

  return link
}

const createApolloClient = (link: ApolloLink) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    link: link
  })

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient(createApolloLink())

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
