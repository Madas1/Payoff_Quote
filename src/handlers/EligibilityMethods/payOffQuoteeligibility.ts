import {ECountryType, IAccountInformation} from "../../models";
import {usEligibility, canadianEligbility} from '../EligibilityMethods';

export const checkEligibleForPayoffQuote = (payOffQuoteEligblityStatus: boolean, accountInformation: IAccountInformation): boolean =>{

	if (accountInformation.isOpen && accountInformation.editable) {
			if (accountInformation.countryType === ECountryType.USA)
				payOffQuoteEligblityStatus = usEligibility(payOffQuoteEligblityStatus, accountInformation);

			if (accountInformation.countryType === ECountryType.Canada)
				payOffQuoteEligblityStatus = canadianEligbility(payOffQuoteEligblityStatus, accountInformation);
        }
        return payOffQuoteEligblityStatus;
}