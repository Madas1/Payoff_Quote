import { EStateType, EAccountType, ETerminationStatus, EprocessStatus, IAccountInformation } from "../../models";


export const usEligibility = (eligibleForPayoffQuote: boolean, accountInformation: IAccountInformation): boolean => {


    if ([EStateType.CO, EStateType.FL, EStateType.SD].includes(accountInformation.state) && accountInformation.accountType === EAccountType.lease) {
        eligibleForPayoffQuote = false;
    }
    if (accountInformation.leaseExtended) {
        eligibleForPayoffQuote = false;
    }
    if (accountInformation.accountType === EAccountType.lease || accountInformation.accountType === EAccountType.cop) {
        if (accountInformation.maturityDate.getDate() + 1 === new Date().getDate()) {
            // FIX: Change to moment
            eligibleForPayoffQuote = false;
        }

        if (accountInformation.isGrounded && accountInformation.terminationStatus === ETerminationStatus.S) {
            eligibleForPayoffQuote = false;
        }

        if (accountInformation.terminationStatus === ETerminationStatus.T) {
            eligibleForPayoffQuote = false;
        }

        if (accountInformation.accountType === EAccountType.retail && accountInformation.dueAumount <= 5) {
            eligibleForPayoffQuote = false;
        }

        if (!accountInformation.isOpen && !accountInformation.disabled) {
            eligibleForPayoffQuote = false;
        }

        if (accountInformation.processStatus === EprocessStatus.pending || accountInformation.processStatus === EprocessStatus.completed) {
            eligibleForPayoffQuote = false;
        }
    }

    return eligibleForPayoffQuote;
}