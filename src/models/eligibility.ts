//export ENUMS
export enum EprocessStatus {
    none, pending, completed
}

export enum EterminationType {
    terminationByPayoff
}

export enum EreposessionStatus {
    reposessed
}

export enum EBankruptcyStatus {
    bankrupt
}

export enum ECountryType {
    USA, Canada
}

export enum EStateType {
    CO, FL, SD
}

export enum EAccountType {
    lease, cop, balloon, retail
}

export enum ETerminationStatus {
    E, T, S
}

export enum EAccountStatus {
    paidoff, closed, active
}

// Interfaces
export interface iEligibilityStatus {
    eligibleForPayoffQuote: boolean,
    eligibleonlinePayoff: boolean,
    eligbilepayOffByMail: boolean
}

export interface  IAccountInformation {
    isOpen: boolean,
    processStatus: EprocessStatus, 
    terminationType: EterminationType, 
    reposessionStatus: EreposessionStatus,
    daysDelinquent: number,
    bankruptcyStatus: EBankruptcyStatus,
    leaseExtended: boolean,
    isGrounded: boolean,
    countryType: ECountryType, 
    state: EStateType, 
    maturityDate: Date,
    accountType: EAccountType,
    terminationStatus: ETerminationStatus,
    editable: boolean,
    payOffAmount: 0,
    dueAumount: 0,
    disabled: boolean,
    accountStatus: EAccountStatus,
    lastEdited: Date
}


export interface IAccountInformationProcess {
    
    checkEligibleForPayoffQuote: () => boolean;
    checkOnlinePayoffEligibility: () => boolean;
    EligiblityStatus: () => iEligibilityStatus;
    getAccountDetails: () => IAccountInformation;
    updateAccountInformation: () => void;
    updateEligiblityStatus: () => void;
}