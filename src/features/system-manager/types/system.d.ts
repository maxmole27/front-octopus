interface SystemResponse {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Name: string;
  Description: string;
  ImageUrl: string;
  InitialBankroll: number;
  IsBacktesting: boolean;
  StakeByDefault: number;
  SportId: number;
  Sport: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Name: string;
    Description: string;
  };
}

interface FormSystemRequest {
  systemName: string
  systemDescription: string
  systemProfileImage: string
  systemInitialBankroll: InputNumberProps
  systemIsBacktesting: boolean
  systemDefaultStake: InputNumberProps
  systemDefaultSports: DropdownProps
  systemDefaultBookie: DropdownProps
}

interface FormSystemCreate {
  Name: string
  Description: string
  ImageUrl: string
  InitialBankroll: number
  IsBacktesting: boolean
  StakeByDefault: number
  SportId: string | number
  BookieId: string | number
}
