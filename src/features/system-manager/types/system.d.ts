interface SystemResponse {
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
  sport: {
    id: number;
    created_at: string;
    updated_at: string;
    nameame: string;
    description: string;
  };
  bookie_id: number;
  bookie: {
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

interface FormSystemRequest {
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

interface FormSystemCreate {
  name: string
  description: string
  image_url: string
  initial_bankroll: number
  is_backtesting: boolean
  stake_by_default: number
  sport_by_default: string | number
  bookie_by_default: string | number
  owner_id: number
}

interface SystemListDataResponse {
  currentPage: number
  totalPages: number
  totalItems: number
  data: SystemResponse[]
  message: string
  code: number
}
