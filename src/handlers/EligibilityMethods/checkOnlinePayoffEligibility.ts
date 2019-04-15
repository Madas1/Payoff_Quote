import {EAccountType, ECountryType, IAccountInformation} from "../../models";

export const checkOnlinePayoffEligibility = (eligibleonlinePayoff: boolean, accountInformation: IAccountInformation): boolean => {
    
    

    if (accountInformation.accountType === EAccountType.lease || accountInformation.countryType === ECountryType.USA) {
        eligibleonlinePayoff = false;
    }
    if (
        accountInformation.accountType === EAccountType.retail ||
        accountInformation.accountType === EAccountType.balloon ||
        accountInformation.accountType === EAccountType.cop
    ) {
        if (accountInformation.payOffAmount > 5 && accountInformation.payOffAmount <= 25000) {
            eligibleonlinePayoff = true;
        }
    }

    return eligibleonlinePayoff;
}