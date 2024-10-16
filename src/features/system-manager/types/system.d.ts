import { IndividualBet } from './individual-bet'

export interface SystemResponse {
  id: number;
  created_at: string;
  update_at: string;
  name: string;
  description: string;
  image_url: string;
  initial_bankroll: number;
  is_backtesting: boolean;
  stake_by_default: number;
  sport_id: number;
  sport_by_default?: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
  };
  bookie_id: number;
  bookie_by_default?: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
  };
  owner_id: number;
  owner: {
    id: number;
    created_at: string;
    updated_at: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
  };
}

export interface FormSystemRequest {
  systemName: string
  systemDescription: string
  systemProfileImage: string
  systemInitialBankroll: number
  systemIsBacktesting: boolean
  systemDefaultStake: number
  systemDefaultSports: number
  systemDefaultBookie: number
  systemOwnerId: number
}

export interface FormSystemCreate {
  name: string
  description: string
  image_url: string
  initial_bankroll: number
  is_backtesting: boolean
  stake_by_default: number
  sport_by_default_id: string | number
  bookie_by_default_id: string | number
  owner_id: number
}

export interface SystemListDataResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  data: SystemResponse[]
  message: string
  code: number
}

export interface BetslipResponse {
  id: number
  system_id: number
  stake: number
  money_stake: number
  created_at: string
  updated_at: string
  individual_bets: IndividualBet[]
}
