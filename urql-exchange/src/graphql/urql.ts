import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import { sseExchange } from './grafbase-exchange'

const GRAPHQL_URL = 'https://todo-aaa-vitalikda.grafbase.app/graphql'
const GRAPHQL_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg3ODk4NzUsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFHSjVUMUNCRk5XU1IyMUtaMjJOMTdBVEYiLCJqdGkiOiIwMUdKNVQxQ0JGWFhLV1JIMTBWMTJIUzkzRCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.DTxBJz6Cbw808t_v1JQzWhAlM6HNQnZijLh95a2xvE0'

const client = createClient({
  url: GRAPHQL_URL,
  fetchOptions: {
    headers: { 'x-api-key': GRAPHQL_KEY }
  },
  exchanges: [dedupExchange, cacheExchange, sseExchange, fetchExchange]
})

export { client as urqlClient, Provider as UrqlProvider }
