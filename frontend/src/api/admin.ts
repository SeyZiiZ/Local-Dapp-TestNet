import { gql } from '@apollo/client'
import axios from 'axios';

const PORT = "http://localhost:3000";

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

export class AdminService {
  static async decisionWhitelist(id: string, decision: string) {
    try {
      const response = await axios.put(`${PORT}/admin/decisionWhitelist`, {
        id,
        decision
      }, {withCredentials: true})
      return response.data;
    } catch (error: any) {
      console.error("Erreur lors de l'inscription :", error);
      return null;
    }
  }
}