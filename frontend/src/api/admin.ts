import { gql } from '@apollo/client'

export const GET_ADMIN_STATS = gql`
  query {
    getAdminStats {
      totalUsers
      totalWhitelisted
      totalTransactions
      whitelistRequests {
        id
        wallet
        createdAt
        status
      }
    }
  }
`;