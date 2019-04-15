import {EAccountType, EStateType, ECountryType, IAccountInformation} from '../../models';

export const checkpayOffByMailEligibility =(eligbilepayOffByMail: boolean, accountInformation: IAccountInformation) : boolean =>{
    
    if ([EStateType.CO, EStateType.FL, EStateType.SD].includes(accountInformation.state) && 
    accountInformation.accountType === EAccountType.lease) {
        eligbilepayOffByMail = false;
    }
    if(accountInformation.countryType == ECountryType.USA && 
        accountInformation.accountType == EAccountType.lease){
        eligbilepayOffByMail = true;
    }
    if (accountInformation.countryType == ECountryType.USA && 
        accountInformation.accountType == EAccountType.retail || 
        accountInformation.accountType == EAccountType.cop || 
        accountInformation.accountType == EAccountType.balloon && 
        accountInformation.payoffAmount >= 25000){
        eligbilepayOffByMail = true;        
    }
    if (accountInformation.countryType == ECountryType.Canada && 
        accountInformation.accountType == EAccountType.retail || 
        accountInformation.accountType == EAccountType.balloon){
        eligbilepayOffByMail = true;
    }
    if (accountInformation.countryType == ECountryType.Canada && 
        accountInformation.accountType == EAccountType.lease){
        eligbilepayOffByMail = false;
    }
    return eligbilepayOffByMail;
}